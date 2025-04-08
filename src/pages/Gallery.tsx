
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryHorizontal, Image } from 'lucide-react';

const Gallery = () => {
  const galleryCategories = [
    { id: 1, title: 'Grand Ballroom', images: [
      '/images/ballroom1.jpg',
      '/images/ballroom2.jpg',
      '/images/ballroom3.jpg',
    ]},
    { id: 2, title: 'Garden Paradise', images: [
      '/images/garden1.jpg',
      '/images/garden2.jpg',
      '/images/garden3.jpg',
    ]},
    { id: 3, title: 'Wedding Ceremonies', images: [
      '/images/ceremony1.jpg',
      '/images/ceremony2.jpg',
      '/images/ceremony3.jpg',
    ]},
    { id: 4, title: 'Wedding Receptions', images: [
      '/images/reception1.jpg',
      '/images/reception2.jpg',
      '/images/reception3.jpg',
    ]},
  ];

  // For demo purposes, use placeholder images
  const getPlaceholderImage = (index: number) => {
    return `https://source.unsplash.com/random/800x600?wedding,venue,${index}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-wedding-navy text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-4">
              <GalleryHorizontal size={32} className="text-wedding-gold mr-3" />
              <h1 className="text-4xl font-playfair">Our Wedding Gallery</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              Explore our stunning venues and get inspired for your special day. Browse through our collection 
              of wedding ceremonies, receptions, and beautifully decorated venues.
            </p>
          </div>
        </div>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {galleryCategories.map((category) => (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-playfair text-wedding-navy mb-6 text-center">
                  {category.title}
                </h2>
                
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {category.images.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden">
                              <img 
                                src={getPlaceholderImage(index + (category.id * 3))} 
                                alt={`${category.title} ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 bg-white text-wedding-navy border-wedding-gold" />
                  <CarouselNext className="-right-4 bg-white text-wedding-navy border-wedding-gold" />
                </Carousel>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair text-wedding-navy mb-6">
              Ready to Create Your Own Wedding Memories?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Contact us to schedule a visit to our venues and start planning your dream wedding.
            </p>
            <a 
              href="/contact" 
              className="bg-wedding-gold hover:bg-wedding-gold/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
