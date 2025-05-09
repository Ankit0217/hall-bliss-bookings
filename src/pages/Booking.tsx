
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, CheckCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { venues } from '@/data/venues';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  venueId: z.string({ required_error: 'Please select a venue.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  guestCount: z.string().min(1, { message: 'Please enter the number of guests.' }),
  message: z.string().optional(),
});

const Booking = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedVenueId = location.state?.selectedVenue ? String(location.state.selectedVenue) : '';
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      venueId: preselectedVenueId,
      guestCount: '',
      message: '',
    },
  });

  // Debug logging for venue ID
  useEffect(() => {
    console.log("Preselected venue ID:", preselectedVenueId);
    console.log("Available venues:", venues.map(v => ({ id: v.id, name: v.name })));
  }, [preselectedVenueId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Check if user is logged in
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a booking request.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("Form values:", values);
      
      // Find the selected venue and get UUID from venues data
      const selectedVenue = venues.find(venue => venue.id.toString() === values.venueId);
      
      if (!selectedVenue) {
        throw new Error("Selected venue not found");
      }
      
      console.log("Selected venue:", selectedVenue);
      
      // Calculate total price based on venue hourly rate (assuming 6 hours for event)
      const hourlyRate = selectedVenue ? parseFloat(selectedVenue.priceRange.replace(/[^0-9]/g, '')) / 100 : 1000;
      const totalPrice = hourlyRate * 6; // 6 hours event duration
      
      // Format date for database (YYYY-MM-DD)
      const formattedDate = format(values.date, 'yyyy-MM-dd');
      
      // Default times (can be customized later)
      const startTime = '18:00';
      const endTime = '00:00';
      
      // Insert booking into database with UUID for venue
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: session.user.id,
          venue_id: selectedVenue.uuid, // Use UUID here
          event_date: formattedDate,
          start_time: startTime,
          end_time: endTime,
          guest_count: parseInt(values.guestCount),
          total_price: totalPrice,
          status: 'pending'
        });
      
      if (error) {
        console.error("Booking submission error:", error);
        throw error;
      }
      
      console.log("Booking submitted successfully:", data);
      
      // Show success message
      toast({
        title: "Booking request submitted!",
        description: "We've received your booking request and will contact you soon to confirm details.",
      });
      
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Submission Error",
        description: error.message || "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="container max-w-md mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-20 h-20 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">Booking Request Received!</h1>
              
              <p className="text-gray-600 mb-6">
                Thank you for your booking request. Our team will review your request and contact you within 24 hours to confirm availability and details.
              </p>
              
              <Button onClick={() => setIsSubmitted(false)} className="bg-wedding-gold hover:bg-wedding-gold/90">
                Submit Another Request
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">Book Your Wedding Venue</h1>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below to request a booking for your special day
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John & Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="youremail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="venueId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a venue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {venues.map((venue) => (
                              <SelectItem key={venue.id} value={venue.id.toString()}>
                                {venue.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Wedding Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your wedding, any special requirements, or questions you have."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wedding-gold hover:bg-wedding-gold/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
