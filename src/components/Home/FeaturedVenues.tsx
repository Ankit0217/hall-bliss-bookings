
import React from 'react';
import { Link } from 'react-router-dom';
import { venues } from '@/data/venues';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const FeaturedVenues = () => {
  // Only show the first 3 venues on the homepage
  const featuredVenues = venues.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Wedding Venues</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our hand-picked selection of stunning venues perfect for your special day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map((venue) => (
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
                <div className="absolute top-0 right-0 bg-wedding-gold text-white px-3 py-1 m-3 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-500 mb-2">{venue.location}</p>
                
                <p className="text-gray-700 mb-4">{venue.shortDescription}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-wedding-navy font-medium">{venue.priceRange}</p>
                  <p className="text-gray-600 text-sm">Up to {venue.capacity.max} guests</p>
                </div>
                
                <Button 
                  asChild
                  className="w-full mt-4 bg-wedding-gold hover:bg-wedding-gold/90"
                >
                  <Link to={`/venues/${venue.slug}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline" 
            className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white"
          >
            <Link to="/venues">View All Venues</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenues;
