
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Example data for map points
  const mapPoints = [
    {
      id: 1,
      name: "Great Zimbabwe",
      year: "1100 CE",
      x: 55,
      y: 60,
      technology: "Acoustic Architecture",
      description: "Advanced sound engineering that allowed communication across vast distances without electricity."
    },
    {
      id: 2,
      name: "Timbuktu",
      year: "1400 CE",
      x: 45,
      y: 45,
      technology: "Desert Computing",
      description: "Mathematical systems that used sand patterns to solve complex equations and store information."
    },
    {
      id: 3,
      name: "Axum",
      year: "300 CE",
      x: 60,
      y: 50,
      technology: "Gravity Stabilization",
      description: "Architectural techniques that used principles of physics to create self-stabilizing structures."
    },
    {
      id: 4,
      name: "Congo Basin",
      year: "Pre-colonial",
      x: 52,
      y: 55,
      technology: "Organic Signal Processing",
      description: "Communication networks using plant-based transmissions across forest ecosystems."
    },
    {
      id: 5,
      name: "Nubia",
      year: "2000 BCE",
      x: 57,
      y: 42,
      technology: "Solar Metallurgy",
      description: "Advanced techniques for working with metals using focused solar energy."
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

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  const rotateSphere = () => {
    // This would be implemented with three.js in a production version
    console.log("Rotating sphere");
  };

  return (
    <section id="map" className="section-padding relative bg-gradient-to-b from-muted to-background overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto" ref={mapRef}>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Uncolonized Tech Evolution</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Alternative Technology Timeline</h3>
            <p className="max-w-2xl mx-auto text-foreground/80">
              Explore how African civilizations might have developed technology without colonial disruption.
            </p>
          </div>

          {/* Globe and information display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Globe (placeholder for three.js globe) */}
            <div className="relative aspect-square max-w-md mx-auto rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 animate-pulse-soft overflow-hidden glow-border shadow-lg">
                {/* Globe texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 animate-rotate-slow rounded-full" style={{ animationDuration: '60s' }}></div>
                
                {/* Continent outlines would be rendered with three.js */}
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-accent/5 to-secondary/5 border border-accent/10"></div>
                
                {/* Points on the globe */}
                {mapPoints.map((point) => (
                  <button
                    key={point.id}
                    className={`absolute w-4 h-4 rounded-full ${activePoint === point.id ? 'bg-accent' : 'bg-primary'} animate-pulse-soft hover:scale-150 transition-all duration-300 z-10`}
                    style={{ 
                      left: `${point.x}%`, 
                      top: `${point.y}%`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: activePoint === point.id ? '0 0 15px 5px rgba(251, 191, 36, 0.4)' : '0 0 10px 2px rgba(29, 78, 216, 0.3)'
                    }}
                    onClick={() => setActivePoint(point.id)}
                    aria-label={`View information about ${point.name}`}
                  />
                ))}
                
                {/* Interactive globe controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-primary/20 transition-colors"
                    onClick={rotateSphere}
                    aria-label="Rotate globe"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/><path d="M13 12h6"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Information panel */}
            <div className="glass-card rounded-xl p-6 md:p-8 h-[400px] flex flex-col">
              {activePoint ? (
                <div className="animate-fade-in-up">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h4 className="text-2xl font-bold">{mapPoints[activePoint - 1].name}</h4>
                      <p className="text-sm text-foreground/60">{mapPoints[activePoint - 1].year}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                      Advanced Technology
                    </span>
                  </div>
                  
                  <h5 className="text-lg font-semibold text-secondary mb-3">
                    {mapPoints[activePoint - 1].technology}
                  </h5>
                  
                  <p className="text-foreground/80 mb-6">
                    {mapPoints[activePoint - 1].description}
                  </p>
                  
                  <div className="mt-auto">
                    <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Learn more about this technology
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Explore the Map</h4>
                  <p className="text-foreground/70 max-w-xs">
                    Click on any point on the globe to discover alternative technological developments from African civilizations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
