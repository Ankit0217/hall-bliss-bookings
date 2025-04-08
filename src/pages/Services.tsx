
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';

const Services = () => {
  const weddingServices = [
    {
      id: 1,
      title: 'Venue Rental',
      icon: '🏛️',
      description: 'Our luxurious venues are available for ceremonies, receptions, or both. Choose from our elegant indoor ballrooms or beautiful outdoor gardens.',
      details: [
        'Available for half-day or full-day rental',
        'Flexible seating arrangements',
        'Access to bridal suite and groom\'s room',
        'Climate-controlled environments',
        'Wheelchair accessible'
      ]
    },
    {
      id: 2,
      title: 'Catering Services',
      icon: '🍽️',
      description: 'Delight your guests with our gourmet catering services. Our executive chefs create custom menus tailored to your preferences and dietary needs.',
      details: [
        'Customizable menu options',
        'Dietary accommodations available',
        'Professional serving staff',
        'Wedding cake services',
        'Bar and beverage packages'
      ]
    },
    {
      id: 3,
      title: 'Wedding Planning',
      icon: '📋',
      description: 'Our experienced wedding planners will assist you in creating your perfect day, from initial concept to final execution.',
      details: [
        'Full-service and partial planning packages',
        'Day-of coordination available',
        'Vendor recommendations and management',
        'Timeline creation and management',
        'Budget planning assistance'
      ]
    },
    {
      id: 4,
      title: 'Decor & Florals',
      icon: '💐',
      description: 'Transform your venue with our stunning decoration and floral design services that reflect your personal style and wedding theme.',
      details: [
        'Custom floral arrangements',
        'Theme development and styling',
        'Lighting design',
        'Ceremony and reception decor',
        'Centerpieces and table settings'
      ]
    },
    {
      id: 5,
      title: 'Photography & Videography',
      icon: '📸',
      description: 'Capture your special moments with our professional photography and videography services.',
      details: [
        'Engagement photo sessions',
        'Full-day wedding coverage',
        'Drone aerial photography',
        'Edited highlight videos',
        'Online gallery sharing'
      ]
    },
    {
      id: 6,
      title: 'Entertainment',
      icon: '🎵',
      description: 'Keep your guests entertained with our range of music and entertainment options for your ceremony and reception.',
      details: [
        'Live bands and orchestras',
        'Professional DJs',
        'Sound system rental',
        'Lighting effects',
        'Special entertainment acts'
      ]
    }
  ];

  const includedAmenities = [
    'Tables and chairs setup',
    'Basic linens in white or ivory',
    'Cleaning and setup services',
    'Parking for guests',
    'Security personnel',
    'Basic sound system',
    'WiFi access',
    'Backup generators'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-wedding-navy text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-playfair text-center mb-4">Our Wedding Services</h1>
            <p className="text-center max-w-2xl mx-auto">
              We offer a comprehensive range of services to make your wedding day truly special.
              From venue rental to full-service planning, we've got you covered.
            </p>
          </div>
        </div>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair text-wedding-navy mb-8 text-center">
              Our Wedding Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weddingServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <CardTitle className="font-playfair text-xl text-wedding-navy">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Collapsible className="w-full">
                      <CollapsibleTrigger className="flex items-center text-wedding-gold font-medium">
                        <span>View Details</span>
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="mt-3 space-y-1 text-gray-600">
                          {service.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-wedding-gold mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair text-wedding-navy mb-6 text-center">
              Included with Every Venue Booking
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {includedAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-wedding-gold mr-3"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-wedding-navy text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair mb-6">
              Ready to Start Planning Your Dream Wedding?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Contact us today to discuss your wedding needs and let our team help you create the perfect celebration.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/contact" 
                className="bg-wedding-gold hover:bg-wedding-gold/90 text-white px-6 py-3 rounded-md transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/book" 
                className="bg-white hover:bg-gray-100 text-wedding-navy px-6 py-3 rounded-md transition-colors"
              >
                Book a Venue Tour
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
