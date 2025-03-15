
import { useEffect, useRef, useState } from "react";

const Vision = () => {
  const visionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const visionScenes = [
    {
      title: "Floating Bio-Clinics",
      description: "Airborne medical facilities powered by NzuriCore, bringing healthcare to remote communities across Africa.",
      color: "from-primary/20 to-secondary/20",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600"
    },
    {
      title: "Forest Cities",
      description: "Urban centers that grow with nature, using NzuriCore to create self-sustaining communities.",
      color: "from-primary/20 to-accent/20",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600"
    },
    {
      title: "Reforestation Drones",
      description: "AI-guided drones that restore ecosystems with precision, using organic computing to adapt to local conditions.",
      color: "from-secondary/20 to-accent/20",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (visionRef.current) {
      observer.observe(visionRef.current);
    }

    // Auto-rotate slides
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % visionScenes.length);
    }, 5000);

    return () => {
      if (visionRef.current) {
        observer.unobserve(visionRef.current);
      }
      clearInterval(slideInterval);
    };
  }, [visionScenes.length]);

  return (
    <section 
      id="vision" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden py-20"
      ref={visionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-radial ${
            visionScenes[activeSlide].color
          } opacity-50 blur-3xl`}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Vision for the Future</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">Africa in 2050</h3>
            <p className="max-w-2xl mx-auto text-foreground/80">
              Imagine a world where technology enhances nature instead of depleting it. This is the future we're building.
            </p>
          </div>

          {/* Vision Carousel */}
          <div className="max-w-5xl mx-auto relative">
            {/* Slides */}
            <div className="relative aspect-video rounded-xl overflow-hidden glow-border">
              {visionScenes.map((scene, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    activeSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Background image */}
                  <img 
                    src={scene.image} 
                    alt={scene.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-center justify-center p-8">
                    <div className="text-center max-w-2xl animate-fade-in-up">
                      <div className="inline-block mb-4 rounded-full px-4 py-1 text-sm font-medium bg-background/20 backdrop-blur-sm">
                        Future Technology
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">{scene.title}</h4>
                      <p className="text-lg text-white/90 drop-shadow-md">{scene.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-6 gap-2">
              {visionScenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? "bg-primary w-8" 
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Vision statement */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl font-display italic text-foreground/90 leading-relaxed">
              "We don't just predict the future. We create it—a future where technology and nature exist not as adversaries, but as partners in a world that thrives."
            </blockquote>
            <p className="mt-4 font-medium text-primary">Dr. Amara Okafor, Founder of NzuriCore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
