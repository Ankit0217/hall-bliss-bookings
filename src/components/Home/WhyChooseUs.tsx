
import React from 'react';
import { Heart, Camera, UtensilsCrossed, Calendar, Users, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: <Heart className="w-10 h-10 text-wedding-blush" />,
    title: "Stunning Venues",
    description: "Choose from a diverse range of beautiful and unique venues that will make your wedding day truly special."
  },
  {
    icon: <Calendar className="w-10 h-10 text-wedding-blush" />,
    title: "Flexible Scheduling",
    description: "We offer flexible booking options to accommodate your preferred dates and timeline."
  },
  {
    icon: <UtensilsCrossed className="w-10 h-10 text-wedding-blush" />,
    title: "Catering Options",
    description: "Partner with our recommended caterers or bring your own to create the perfect menu for your celebration."
  },
  {
    icon: <Camera className="w-10 h-10 text-wedding-blush" />,
    title: "Photo-Ready Spaces",
    description: "Every venue features multiple picturesque settings for unforgettable wedding photos."
  },
  {
    icon: <Users className="w-10 h-10 text-wedding-blush" />,
    title: "Experienced Staff",
    description: "Our dedicated team will guide you through the planning process and ensure everything runs smoothly."
  },
  {
    icon: <ThumbsUp className="w-10 h-10 text-wedding-blush" />,
    title: "5-Star Reviews",
    description: "Join hundreds of satisfied couples who have trusted us with their special day."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Hall Bliss</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're dedicated to making your wedding day perfect with exceptional venues and seamless service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
