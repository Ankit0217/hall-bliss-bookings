
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wedding-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-playfair mb-4">Hall Bliss</h3>
            <p className="text-gray-300 mb-4">
              Creating unforgettable wedding celebrations in stunning venues for over a decade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-wedding-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-playfair text-lg mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/venues" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Our Venues
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Wedding Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-wedding-gold shrink-0" />
                <span className="text-gray-300">123 Wedding Street, City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-wedding-gold shrink-0" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-wedding-gold shrink-0" />
                <span className="text-gray-300">info@hallbliss.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-lg mb-4">Subscribe</h4>
            <p className="text-gray-300 mb-3">
              Sign up for our newsletter to receive special offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-wedding-gold"
              />
              <button
                type="submit"
                className="bg-wedding-gold text-white px-4 py-2 rounded-md hover:bg-wedding-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Hall Bliss. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
