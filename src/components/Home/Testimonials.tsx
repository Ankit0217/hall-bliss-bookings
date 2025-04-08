
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Our wedding at The Grand Ballroom exceeded all expectations. The venue was breathtaking and the staff went above and beyond to make our day perfect. We couldn't have asked for a more beautiful setting for our celebration.",
    author: "Sarah & Michael",
    venue: "The Grand Ballroom",
    rating: 5,
    image: "https://images.unsplash.com/photo-1588979355313-6711a3edabde?q=80&w=772&auto=format&fit=crop"
  },
  {
    id: 2,
    content: "The Seaside Terrace provided the perfect backdrop for our wedding. The ocean views were stunning and our guests are still talking about how beautiful everything was. Thank you for helping us create memories that will last a lifetime.",
    author: "Jessica & David",
    venue: "Seaside Terrace",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519741347686-c1e331bd7f18?q=80&w=1169&auto=format&fit=crop"
  },
  {
    id: 3,
    content: "We fell in love with the Vineyard Estate the moment we saw it. The rustic charm combined with the beautiful surroundings made for a magical wedding day. The entire planning process was smooth and the staff was incredibly helpful.",
    author: "Emily & James",
    venue: "Vineyard Estate",
    rating: 5,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1170&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-wedding-champagne to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Couples Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read about the experiences of couples who celebrated their special day with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.venue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
