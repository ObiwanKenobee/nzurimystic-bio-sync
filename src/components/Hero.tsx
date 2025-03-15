
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollTop = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || "0.1");
        (element as HTMLElement).style.transform = `translateY(${scrollTop * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Animate forest elements
  const pulseElements = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div 
        key={index} 
        className={`absolute rounded-full bg-primary/30 animate-pulse-soft`}
        style={{
          width: `${Math.random() * 20 + 10}px`,
          height: `${Math.random() * 20 + 10}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          opacity: Math.random() * 0.5 + 0.3
        }}
      />
    ));
  };

  const circuitLines = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div 
        key={index} 
        className={`absolute bg-secondary/30 animate-pulse-soft`}
        style={{
          width: `${Math.random() * 100 + 100}px`,
          height: '1px',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 180}deg)`,
          animationDelay: `${Math.random() * 4}s`,
          opacity: Math.random() * 0.5 + 0.3
        }}
      />
    ));
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=2000" 
          alt="Lush African landscape" 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {pulseElements()}
          {circuitLines()}
          
          {/* Radial gradients */}
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-secondary/20 to-transparent rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 bg-gradient-radial from-primary/20 to-transparent rounded-full animate-pulse-soft" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-1/5 h-1/5 bg-gradient-radial from-accent/20 to-transparent rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-8 z-10 mt-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          {/* Tag line */}
          <div className="inline-block mb-6 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary backdrop-blur-sm border border-primary/20 animate-fade-in-up">
            The Future of Bio-Technology
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight parallax text-white drop-shadow-md" data-speed="-0.05">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">NzuriCore:</span> <br className="md:hidden" />
            Where Nature Meets Intelligence
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto parallax drop-shadow-md" data-speed="0.1">
            Harnessing the power of Africa's ecosystems to revolutionize computing, creating sustainable technology that works in harmony with nature.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 parallax" data-speed="0.2">
            <button className="bio-button relative group overflow-hidden" onClick={scrollToAbout}>
              <span className="relative z-10 flex items-center">
                Explore the Future
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer"></span>
            </button>
            <button className="bio-button bio-button-accent">
              <span className="relative z-10">Learn More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-1.5 h-8 rounded-full relative overflow-hidden border-2 border-white/50">
          <div className="absolute top-0 left-0 w-full animate-[pulse_1.5s_ease-in-out_infinite] bg-white h-1/2 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
