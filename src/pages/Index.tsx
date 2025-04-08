
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Home/Hero';
import FeaturedVenues from '@/components/Home/FeaturedVenues';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import DateAvailability from '@/components/Home/DateAvailability';
import Testimonials from '@/components/Home/Testimonials';
import CallToAction from '@/components/Home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedVenues />
        <WhyChooseUs />
        <DateAvailability />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
