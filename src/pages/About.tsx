
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const About = () => {
  const teamMembers = [
    {
      name: 'Sophia Reynolds',
      position: 'Founder & CEO',
      image: 'https://source.unsplash.com/random/300x300?woman,professional,1',
      bio: 'Sophia has over 15 years of experience in event planning and venue management. She founded Hall Bliss with a vision to create unforgettable wedding experiences.'
    },
    {
      name: 'James Wilson',
      position: 'Executive Wedding Planner',
      image: 'https://source.unsplash.com/random/300x300?man,professional,1',
      bio: 'With a background in luxury hospitality, James brings creativity and precision to every wedding he plans. He specializes in creating bespoke experiences.'
    },
    {
      name: 'Emma Chen',
      position: 'Creative Director',
      image: 'https://source.unsplash.com/random/300x300?woman,professional,2',
      bio: 'Emma oversees all aspects of design and decoration, ensuring that each venue is transformed according to the couple\'s vision and dreams.'
    },
    {
      name: 'Michael Rodriguez',
      position: 'Culinary Director',
      image: 'https://source.unsplash.com/random/300x300?man,professional,2',
      bio: 'A trained chef with experience in fine dining, Michael creates memorable culinary experiences that delight and surprise wedding guests.'
    }
  ];

  const timelineEvents = [
    { year: '2010', title: 'Foundation', description: 'Hall Bliss was founded with a single venue in downtown.' },
    { year: '2013', title: 'Expansion', description: 'Added our Garden Paradise venue and expanded services to include full wedding planning.' },
    { year: '2016', title: 'Award Recognition', description: 'Received "Best Wedding Venue" award from Wedding Industry Excellence.' },
    { year: '2018', title: 'Renovation', description: 'Completely renovated our Grand Ballroom to enhance its elegance and capacity.' },
    { year: '2020', title: 'Digital Transformation', description: 'Launched virtual tours and expanded our online booking options.' },
    { year: '2023', title: 'New Venues', description: 'Added our Seaside Dreams venue to offer oceanfront wedding experiences.' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-wedding-navy text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-playfair text-center mb-4">About Hall Bliss</h1>
            <p className="text-center max-w-2xl mx-auto">
              Learn about our journey, our team, and our commitment to creating perfect wedding experiences.
            </p>
          </div>
        </div>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="https://source.unsplash.com/random/800x600?wedding,venue" 
                  alt="Hall Bliss Venue" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-playfair text-wedding-navy mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2010, Hall Bliss began with a simple vision: to create wedding venues that combine elegance, 
                  functionality, and personalized service. What started as a single downtown venue has grown into a 
                  collection of stunning locations, each with its own unique character and charm.
                </p>
                <p className="text-gray-700 mb-4">
                  Over the years, we've had the privilege of hosting thousands of weddings, each one as unique as the 
                  couples themselves. Our dedicated team works tirelessly to ensure that every detail is perfect, 
                  from the table settings to the lighting, creating environments where love stories can unfold.
                </p>
                <p className="text-gray-700">
                  Today, Hall Bliss is recognized as one of the premier wedding venue providers in the region, 
                  known for our attention to detail, personalized service, and stunning spaces. We continue to 
                  evolve and innovate, always with our couples' dreams at the center of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair text-wedding-navy mb-8 text-center">Our Timeline</h2>
            
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute h-full w-1 bg-wedding-gold left-1/2 transform -translate-x-1/2"></div>
              
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative z-10 mb-8 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex w-5/12 ${index % 2 !== 0 && 'justify-end'}`}>
                    <div className={`bg-white p-6 rounded-lg shadow-md ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                      <div className="font-bold text-wedding-gold text-xl mb-1">{event.year}</div>
                      <h3 className="font-medium text-wedding-navy text-lg mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-wedding-gold border-4 border-white"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair text-wedding-navy mb-8 text-center">
              Our Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-4xl text-wedding-gold mb-3">❤️</div>
                <h3 className="text-xl font-playfair text-wedding-navy mb-2">Passion</h3>
                <p className="text-gray-600">We are passionate about creating perfect wedding experiences that reflect each couple's unique love story.</p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-4xl text-wedding-gold mb-3">⭐</div>
                <h3 className="text-xl font-playfair text-wedding-navy mb-2">Excellence</h3>
                <p className="text-gray-600">We strive for excellence in every detail, from venue preparation to customer service.</p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-4xl text-wedding-gold mb-3">🤝</div>
                <h3 className="text-xl font-playfair text-wedding-navy mb-2">Integrity</h3>
                <p className="text-gray-600">We operate with honesty and transparency, building trust with our clients every step of the way.</p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-4xl text-wedding-gold mb-3">💡</div>
                <h3 className="text-xl font-playfair text-wedding-navy mb-2">Innovation</h3>
                <p className="text-gray-600">We constantly seek new ideas and approaches to enhance the wedding experience for our clients.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair text-wedding-navy mb-8 text-center">
              Meet Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl text-wedding-navy mb-1">{member.name}</h3>
                    <p className="text-wedding-gold font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-wedding-navy text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair mb-6">
              Ready to Experience Hall Bliss?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Let us help you create the wedding of your dreams in one of our beautiful venues.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/contact" 
                className="bg-wedding-gold hover:bg-wedding-gold/90 text-white px-6 py-3 rounded-md transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/venues" 
                className="bg-white hover:bg-gray-100 text-wedding-navy px-6 py-3 rounded-md transition-colors"
              >
                Explore Venues
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
