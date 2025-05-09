
import React, { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { venues } from '@/data/venues';
import { format } from 'date-fns';
import { ChevronDown, CheckCircle2, XCircle, Clock, FileSearch, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'confirm' | 'cancel' | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query
      let query = supabase
        .from('bookings')
        .select('*, profiles:user_id(email)');
      
      // Apply status filter if selected
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      // Order by event date
      query = query.order('event_date', { ascending: true });
      
      const { data: bookingsData, error: bookingsError } = await query;
      
      if (bookingsError) {
        console.error("Error fetching bookings:", bookingsError);
        throw bookingsError;
      }
      
      // Transform the data and add venue names from the venues data
      const transformedBookings: Booking[] = bookingsData.map((booking: any) => {
        // Find the venue from the local data using the UUID
        const venue = venues.find(v => v.uuid === booking.venue_id);
        
        return {
          ...booking,
          userEmail: booking.profiles?.email || 'Unknown',
          venueName: venue?.name || 'Unknown Venue',
        };
      });
      
      setBookings(transformedBookings);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Failed to load bookings');
      toast({
        title: "Error Loading Bookings",
        description: `${err.message || 'Failed to load bookings'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state to reflect changes
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
      
      toast({
        title: `Booking ${status === 'confirmed' ? 'Confirmed' : 'Cancelled'}`,
        description: `The booking has been ${status}.`,
      });
      
      // Close the dialog if it's open
      setConfirmDialogOpen(false);
    } catch (err: any) {
      console.error(`Error updating booking status:`, err);
      toast({
        title: "Status Update Failed",
        description: err.message || `Failed to update booking status.`,
        variant: "destructive",
      });
    }
  };

  const handleActionClick = (booking: Booking, action: 'confirm' | 'cancel') => {
    setSelectedBooking(booking);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]); // Refetch when filter changes

  // Helper function to render status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (err) {
      console.error("Date formatting error:", err);
      return dateString || 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-wedding-navy border-t-transparent rounded-full" />
        <span className="ml-3">Loading bookings...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-wedding-navy">Wedding Bookings</h2>
        <div className="flex space-x-3">
          {/* Status filter */}
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-gray-500" />
            <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Refresh button */}
          <Button onClick={() => fetchBookings()} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <FileSearch className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-500 text-lg font-medium">No bookings found</p>
          <p className="text-gray-400 mt-1">
            {statusFilter 
              ? `No ${statusFilter} bookings are available` 
              : 'There are no bookings in the system yet'}
          </p>
          <Button onClick={() => setStatusFilter(null)} variant="link" className="mt-2">
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Client</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">
                    {booking.userEmail}
                  </TableCell>
                  <TableCell>
                    {booking.venueName}
                  </TableCell>
                  <TableCell>
                    {formatDate(booking.event_date)}
                  </TableCell>
                  <TableCell>
                    {booking.guest_count}
                  </TableCell>
                  <TableCell>
                    ${booking.total_price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(booking.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Actions</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {booking.status === 'pending' && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => handleActionClick(booking, 'confirm')}
                              className="text-green-600"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Confirm Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleActionClick(booking, 'cancel')}
                              className="text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <DropdownMenuItem 
                            onClick={() => handleActionClick(booking, 'cancel')}
                            className="text-red-600"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                        {booking.status === 'cancelled' && (
                          <DropdownMenuItem 
                            onClick={() => handleActionClick(booking, 'confirm')}
                            className="text-green-600"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Reactivate Booking
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'confirm' ? 'Confirm Booking' : 'Cancel Booking'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'confirm' 
                ? 'Are you sure you want to confirm this booking? This will notify the customer.'
                : 'Are you sure you want to cancel this booking? This cannot be easily undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, go back</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedBooking && actionType) {
                  updateBookingStatus(
                    selectedBooking.id, 
                    actionType === 'confirm' ? 'confirmed' : 'cancelled'
                  );
                }
              }}
              className={actionType === 'confirm' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              Yes, {actionType === 'confirm' ? 'confirm' : 'cancel'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingManagement;
