
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl animate-fade-in">
          Your Perfect Wedding Venue Awaits
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '200ms' }}>
          Discover stunning venues for your special day and create memories that last a lifetime
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Button 
            asChild
            size="lg" 
            className="bg-wedding-gold hover:bg-wedding-gold/90 text-white px-8 font-medium"
          >
            <Link to="/venues">Explore Venues</Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="bg-transparent border-white text-white hover:bg-white/10 px-8 font-medium"
          >
            <Link to="/book">Book a Tour</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
