
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { venues } from '@/data/venues';
import { useToast } from '@/hooks/use-toast';
import { Booking } from '@/types/booking';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  Edit, 
  Loader2, 
  Calendar, 
  Clock,
  User,
  MapPin,
  Users
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState<Partial<Booking>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('event_date', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Get user emails for each booking
      const bookingsWithUserInfo = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          // Get user email
          const { data: userData } = await supabase
            .auth
            .admin
            .getUserById(booking.user_id);

          // Get venue name using the venues data from local data file
          // Convert venue_id to string for comparison since venue IDs in the venues data are strings
          const venue = venues.find(v => v.id === String(booking.venue_id));
          
          return {
            ...booking,
            userEmail: userData?.user?.email || 'Unknown',
            venueName: venue?.name || 'Unknown Venue',
            // Ensure status is one of the allowed values
            status: booking.status as 'pending' | 'confirmed' | 'cancelled'
          } as Booking;
        })
      );

      setBookings(bookingsWithUserInfo);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bookings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status } 
          : booking
      ));

      toast({
        title: 'Success',
        description: `Booking ${status === 'confirmed' ? 'confirmed' : 'cancelled'} successfully.`,
      });
    } catch (error) {
      console.error(`Error ${status === 'confirmed' ? 'confirming' : 'cancelling'} booking:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${status === 'confirmed' ? 'confirm' : 'cancel'} booking. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setUpdatedBooking({
      guest_count: booking.guest_count,
      event_date: booking.event_date,
      start_time: booking.start_time,
      end_time: booking.end_time,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveBookingChanges = async () => {
    if (!selectedBooking || !updatedBooking) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          guest_count: updatedBooking.guest_count,
          event_date: updatedBooking.event_date,
          start_time: updatedBooking.start_time,
          end_time: updatedBooking.end_time,
          status: updatedBooking.status || selectedBooking.status
        })
        .eq('id', selectedBooking.id);

      if (error) throw error;

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === selectedBooking.id
          ? { 
              ...booking, 
              guest_count: updatedBooking.guest_count ?? booking.guest_count,
              event_date: updatedBooking.event_date ?? booking.event_date,
              start_time: updatedBooking.start_time ?? booking.start_time,
              end_time: updatedBooking.end_time ?? booking.end_time,
              status: updatedBooking.status ?? booking.status,
            } 
          : booking
      ));

      toast({
        title: 'Success',
        description: 'Booking updated successfully.',
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to update booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-wedding-gold" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Booking Management</h2>
        <Button onClick={fetchBookings} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      {booking.userEmail}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {booking.venueName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {format(new Date(booking.event_date), 'MMM d, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {booking.start_time} - {booking.end_time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {booking.guest_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            variant="outline" 
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                          <Button 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button 
                        onClick={() => handleEditBooking(booking)}
                        variant="outline" 
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event_date" className="text-right">
                Date
              </Label>
              <Input
                id="event_date"
                type="date"
                value={updatedBooking.event_date || ''}
                onChange={(e) => setUpdatedBooking({...updatedBooking, event_date: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_time" className="text-right">
                Start Time
              </Label>
              <Input
                id="start_time"
                type="time"
                value={updatedBooking.start_time || ''}
                onChange={(e) => setUpdatedBooking({...updatedBooking, start_time: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_time" className="text-right">
                End Time
              </Label>
              <Input
                id="end_time"
                type="time"
                value={updatedBooking.end_time || ''}
                onChange={(e) => setUpdatedBooking({...updatedBooking, end_time: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="guest_count" className="text-right">
                Guests
              </Label>
              <Input
                id="guest_count"
                type="number"
                value={updatedBooking.guest_count || 0}
                onChange={(e) => setUpdatedBooking({...updatedBooking, guest_count: parseInt(e.target.value, 10)})}
                className="col-span-3"
              />
            </div>
            
            {selectedBooking && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3">
                  <Select 
                    value={updatedBooking.status || selectedBooking.status}
                    onValueChange={(value) => setUpdatedBooking({
                      ...updatedBooking, 
                      status: value as 'pending' | 'confirmed' | 'cancelled'
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBookingChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
