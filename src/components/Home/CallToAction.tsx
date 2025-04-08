
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-wedding-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
          Ready to Begin Your Wedding Journey?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          Contact us today to schedule a tour of our beautiful venues and take the first step toward your dream wedding.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            asChild
            size="lg" 
            className="bg-wedding-gold hover:bg-wedding-gold/90 text-white px-8 font-medium"
          >
            <Link to="/book">Book a Venue</Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="bg-transparent border-white text-white hover:bg-white/10 px-8 font-medium"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
