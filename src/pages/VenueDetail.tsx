
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { venues } from '@/data/venues';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, Star, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const VenueDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [venue, setVenue] = useState(venues.find(v => v.slug === slug));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      const foundVenue = venues.find(v => v.slug === slug);
      setVenue(foundVenue);
      
      // Reset image index when venue changes
      setCurrentImageIndex(0);
      
      // Scroll to top when component mounts or slug changes
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!venue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Venue Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the venue you're looking for.</p>
            <Button asChild>
              <Link to="/venues">View All Venues</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? venue.images.length - 1 : prevIndex - 1
    );
  };

  const handleBookNow = () => {
    toast({
      title: "Booking Request Initiated",
      description: `Your request to book ${venue.name} has been received. We'll contact you shortly to confirm details.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero section with venue image */}
        <div className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${venue.images[currentImageIndex]})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-between p-6">
            <button 
              onClick={handlePrevImage}
              className="bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={handleNextImage}
              className="bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
            <div className="flex space-x-2">
              {venue.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Venue details */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{venue.name}</h1>
              
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-5 h-5 mr-1" />
                <span>{venue.address}</span>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{venue.rating}</span>
                  <span className="text-gray-500 ml-1">({venue.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>{venue.capacity.min}-{venue.capacity.max} guests</span>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6">{venue.description}</p>
                    
                    <h3 className="text-xl font-bold mb-3">Venue Details</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-wedding-gold" />
                        <span>Capacity: {venue.capacity.min}-{venue.capacity.max} guests</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-wedding-gold" />
                        <span>Price Range: {venue.priceRange}</span>
                      </li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mb-3">Location</h3>
                    <p className="text-gray-700">{venue.address}</p>
                    
                    {/* Placeholder for map - In a real application, you would integrate Google Maps or similar */}
                    <div className="mt-4 w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Map View</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features">
                  <h3 className="text-xl font-bold mb-4">Venue Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {venue.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-wedding-gold" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="photos">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venue.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden aspect-video">
                        <img
                          src={image}
                          alt={`${venue.name} - Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking sidebar */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit sticky top-24">
              <h3 className="text-xl font-bold mb-4">Book This Venue</h3>
              
              <div className="mb-6">
                <p className="text-xl font-bold text-wedding-navy mb-1">{venue.priceRange}</p>
                <p className="text-gray-600">for {venue.capacity.min}-{venue.capacity.max} guests</p>
              </div>
              
              <Button 
                onClick={handleBookNow}
                className="w-full bg-wedding-gold hover:bg-wedding-gold/90 mb-4"
              >
                Book Now
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="w-full border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10"
              >
                <Link to="/contact">Request Information</Link>
              </Button>
              
              <div className="mt-6 text-sm text-gray-600">
                <p className="mb-2">Flexible booking available for 2025-2026</p>
                <p>Contact us directly for special arrangements or custom packages.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VenueDetail;
