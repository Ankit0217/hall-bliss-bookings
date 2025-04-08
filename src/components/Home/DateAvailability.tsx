
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// This would typically come from your backend API
const mockAvailableDates = [
  new Date(2025, 4, 10),
  new Date(2025, 4, 15),
  new Date(2025, 4, 20),
  new Date(2025, 4, 25),
  new Date(2025, 5, 5),
  new Date(2025, 5, 10),
  new Date(2025, 5, 15),
  new Date(2025, 5, 20),
  new Date(2025, 5, 25),
  new Date(2025, 6, 5),
  new Date(2025, 6, 10),
  new Date(2025, 6, 15),
  new Date(2025, 6, 20),
];

const venues = [
  { id: 1, name: "The Grand Ballroom" },
  { id: 2, name: "Seaside Terrace" },
  { id: 3, name: "Vineyard Estate" },
  { id: 4, name: "Garden Pavilion" },
];

const DateAvailability = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [venue, setVenue] = useState<string>("");
  const { toast } = useToast();

  const handleCheckAvailability = () => {
    if (!date || !venue) {
      toast({
        title: "Missing information",
        description: "Please select both a date and venue",
        variant: "destructive",
      });
      return;
    }

    // Check if the selected date is available
    const isAvailable = mockAvailableDates.some(
      availableDate => availableDate.toDateString() === date.toDateString()
    );

    if (isAvailable) {
      toast({
        title: "Date Available!",
        description: `${format(date, "MMMM d, yyyy")} is available for ${venues.find(v => v.id.toString() === venue)?.name}. You can proceed with booking.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Date Unavailable",
        description: `We're sorry, ${format(date, "MMMM d, yyyy")} is not available. Please select another date.`,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-8 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Check Date Availability</h2>
            <p className="text-gray-600">
              Find out if your preferred date is available for your wedding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Venue
              </label>
              <Select onValueChange={setVenue} value={venue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map(venue => (
                    <SelectItem key={venue.id} value={venue.id.toString()}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={[
                      { before: new Date() },
                    ]}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-8">
            <Button 
              onClick={handleCheckAvailability}
              className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white"
            >
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateAvailability;
