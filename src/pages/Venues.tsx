
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { venues } from '@/data/venues';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const Venues = () => {
  const [capacity, setCapacity] = useState([0, 500]);
  const [location, setLocation] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const uniqueLocations = ['all', ...new Set(venues.map(venue => venue.location))];

  // Filter venues based on selected filters
  const filteredVenues = venues.filter(venue => {
    const matchesCapacity = venue.capacity.max >= capacity[0] && venue.capacity.min <= capacity[1];
    const matchesLocation = location === 'all' || venue.location === location;
    return matchesCapacity && matchesLocation;
  });

  // Sort venues based on selected sort option
  const sortedVenues = [...filteredVenues].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return parseInt(a.priceRange.replace(/\D/g, '')) - parseInt(b.priceRange.replace(/\D/g, ''));
    } else if (sortBy === 'priceDesc') {
      return parseInt(b.priceRange.replace(/\D/g, '')) - parseInt(a.priceRange.replace(/\D/g, ''));
    } else if (sortBy === 'capacityAsc') {
      return a.capacity.max - b.capacity.max;
    } else if (sortBy === 'capacityDesc') {
      return b.capacity.max - a.capacity.max;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: recommended (no specific sort)
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <div className="relative py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Discover Our Wedding Venues</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              Find the perfect setting for your special day from our collection of beautiful venues
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guest Capacity
                </label>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 500]} 
                    max={500} 
                    step={10} 
                    value={capacity}
                    onValueChange={setCapacity}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{capacity[0]} guests</span>
                    <span>{capacity[1]} guests</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.map(loc => (
                      <SelectItem key={loc} value={loc}>
                        {loc === 'all' ? 'All Locations' : loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Recommended" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="priceAsc">Price (Low to High)</SelectItem>
                    <SelectItem value="priceDesc">Price (High to Low)</SelectItem>
                    <SelectItem value="capacityAsc">Capacity (Low to High)</SelectItem>
                    <SelectItem value="capacityDesc">Capacity (High to Low)</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Venues listing */}
          <div className="mb-8">
            <p className="text-gray-600 mb-4">Showing {sortedVenues.length} venues</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedVenues.map((venue) => (
                <div 
                  key={venue.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={venue.images[0]}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{venue.location}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{venue.shortDescription}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-wedding-navy font-medium">{venue.priceRange}</p>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        <p className="text-sm">Up to {venue.capacity.max}</p>
                      </div>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full bg-wedding-gold hover:bg-wedding-gold/90"
                    >
                      <Link to={`/venues/${venue.slug}`}>View Venue</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Venues;
