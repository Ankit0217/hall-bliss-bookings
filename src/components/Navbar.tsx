
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAuthAction = () => {
    if (session.user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const handleBookNow = () => {
    if (session.user) {
      navigate('/book');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-playfair font-bold text-wedding-navy">
              Hall Bliss
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-wedding-gold transition-colors duration-200">
                Home
              </Link>
              <Link to="/venues" className="text-gray-700 hover:text-wedding-gold transition-colors duration-200">
                Venues
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-wedding-gold transition-colors duration-200">
                Services
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-wedding-gold transition-colors duration-200">
                Gallery
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-wedding-gold transition-colors duration-200">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-wedding-gold transition-colors duration-200">
                Contact
              </Link>
              
              {session.user ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-2 border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition duration-300"
                    onClick={signOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                  <Button 
                    className="bg-wedding-gold hover:bg-wedding-gold/90"
                    onClick={() => navigate('/book')}
                  >
                    Book Now
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition duration-300"
                    onClick={() => navigate('/auth')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    className="bg-wedding-gold hover:bg-wedding-gold/90"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Home
            </Link>
            <Link to="/venues" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Venues
            </Link>
            <Link to="/services" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Services
            </Link>
            <Link to="/gallery" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Gallery
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Contact
            </Link>
            
            {session.user ? (
              <>
                <button 
                  onClick={signOut}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
                <Button 
                  className="w-full mt-2 bg-wedding-gold hover:bg-wedding-gold/90"
                  onClick={() => navigate('/book')}
                >
                  Book Now
                </Button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/auth')}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </button>
                <Button 
                  className="w-full mt-2 bg-wedding-gold hover:bg-wedding-gold/90"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
