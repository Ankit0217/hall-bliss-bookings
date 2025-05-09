
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
import { ChevronDown, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get bookings from Supabase with user email
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*, profiles:user_id(email)')
        .order('created_at', { ascending: false });
      
      if (bookingsError) {
        console.error("Error fetching bookings:", bookingsError);
        throw bookingsError;
      }
      
      console.log('Fetched booking data:', bookingsData);
      
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
      
      console.log('Transformed bookings with venue names:', transformedBookings);
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
    } catch (err: any) {
      console.error(`Error updating booking status:`, err);
      toast({
        title: "Status Update Failed",
        description: err.message || `Failed to update booking status.`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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

  if (loading) {
    return <div className="flex justify-center items-center p-8">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Wedding Bookings</h2>
        <Button onClick={fetchBookings} variant="outline">Refresh</Button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.userEmail}
                  </TableCell>
                  <TableCell>
                    {booking.venueName}
                  </TableCell>
                  <TableCell>
                    {format(new Date(booking.event_date), 'MMM dd, yyyy')}
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
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="text-green-600"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Confirm Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <DropdownMenuItem 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="text-red-600"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                        {booking.status === 'cancelled' && (
                          <DropdownMenuItem 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
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
    </div>
  );
};

export default BookingManagement;
