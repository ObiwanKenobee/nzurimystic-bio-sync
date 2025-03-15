
import React, { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const animatedElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;

      const elements = animatedElementsRef.current;
      const triggerBottom = window.innerHeight * 0.8;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
          element.classList.add("animate-fade-in-up");
          element.style.opacity = "1";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to add elements to the ref
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !animatedElementsRef.current.includes(el)) {
      el.style.opacity = "0";
      animatedElementsRef.current.push(el);
    }
  };

  return (
    <section id="about" className="section-padding relative circuit-bg overflow-hidden" ref={aboutRef}>
      {/* Background organic shape */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[30%] -left-[10%] w-2/3 h-2/3 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-2/3 h-2/3 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">About NzuriCore</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Bio-Circuits: The Next Evolution</h3>
          <p className="max-w-2xl mx-auto text-foreground/80">
            A revolutionary fusion of organic computing and African innovation, creating a sustainable technological ecosystem.
          </p>
        </div>

        {/* Main content - Split section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text explanation */}
          <div className="space-y-8" ref={addToRefs}>
            <div className="feature-card">
              <h4 className="text-xl font-bold mb-3 text-primary">Organic Computing Foundations</h4>
              <p className="text-foreground/80">
                NzuriCore leverages the computational power of specialized fungi and plant structures, creating organic circuits that process information through biochemical reactions rather than electricity.
              </p>
            </div>

            <div className="feature-card" ref={addToRefs}>
              <h4 className="text-xl font-bold mb-3 text-secondary">Self-Sustaining Systems</h4>
              <p className="text-foreground/80">
                Unlike traditional computers, NzuriCore draws energy directly from its environment - sunlight, soil nutrients, and even waste products - forming a closed-loop system that requires no external power source.
              </p>
            </div>

            <div className="feature-card" ref={addToRefs}>
              <h4 className="text-xl font-bold mb-3 text-accent">African Innovation</h4>
              <p className="text-foreground/80">
                Inspired by traditional African knowledge systems, NzuriCore reconnects technological advancement with ecological wisdom, creating solutions that enhance rather than deplete our natural world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8" ref={addToRefs}>
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Carbon Negative</span>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Self-Repairing</span>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Infinitely Scalable</span>
              </div>
            </div>
          </div>

          {/* Right side - Interactive visualization */}
          <div className="relative z-10" ref={addToRefs}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main circle with animation */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-soft overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm"></div>
                
                {/* Inner circles - data nodes */}
                {Array.from({ length: 6 }).map((_, idx) => {
                  const angle = (idx * 60 * Math.PI) / 180;
                  const radius = 40; // % of container
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  
                  return (
                    <div 
                      key={idx}
                      className="absolute w-6 h-6 rounded-full bg-secondary animate-pulse-soft glow-border"
                      style={{ 
                        left: `${x}%`, 
                        top: `${y}%`, 
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${idx * 0.5}s`
                      }}
                    />
                  );
                })}
                
                {/* Center node */}
                <div className="absolute left-1/2 top-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-pulse-soft glow-border">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-secondary animate-rotate-slow"></div>
                </div>
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const angle = (idx * 60 * Math.PI) / 180;
                    const radius = 40;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    
                    return (
                      <line 
                        key={idx}
                        x1="50" 
                        y1="50" 
                        x2={x} 
                        y2={y}
                        stroke="rgba(14, 165, 233, 0.4)"
                        strokeWidth="0.5"
                        strokeDasharray="4 2"
                        className="animate-pulse-soft"
                        style={{ animationDelay: `${idx * 0.3}s` }}
                      />
                    );
                  })}
                </svg>
              </div>
              
              {/* Outer rings */}
              <div className="absolute inset-[-10%] rounded-full border border-secondary/20 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-[-20%] rounded-full border border-secondary/10 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
              
              {/* Animated data flow particles */}
              {Array.from({ length: 3 }).map((_, idx) => {
                const startAngle = ((idx * 120) * Math.PI) / 180;
                const animationDuration = 3 + idx;
                
                return (
                  <div 
                    key={idx}
                    className="absolute w-2 h-2 rounded-full bg-accent animate-pulse-soft"
                    style={{ 
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      animation: `orbit ${animationDuration}s linear infinite`,
                      animationDelay: `${idx * 1}s`
                    }}
                  />
                );
              })}
            </div>
            
            {/* Caption */}
            <p className="text-center text-sm text-foreground/60 mt-4">
              Interactive Visualization: Hover to see bio-circuits in action
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
