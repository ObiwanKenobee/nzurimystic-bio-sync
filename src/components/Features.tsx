
import { useEffect, useRef, useState } from "react";
import { 
  Zap, 
  Leaf, 
  Network, 
  Globe, 
  RefreshCw,
  Shield,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const animatedElementsRef = useRef<HTMLDivElement[]>([]);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!featuresRef.current) return;

      const elements = animatedElementsRef.current;
      const triggerBottom = window.innerHeight * 0.8;

      elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
          setTimeout(() => {
            element.classList.add("animate-fade-in-up");
            element.style.opacity = "1";
          }, index * 100); // Staggered animation
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

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Beyond Quantum Computing",
      description: "Self-repairing computational structures with virtually infinite energy efficiency, processing data through organic neural networks."
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Eco-Symbiotic AI",
      description: "AI systems that enhance biodiversity, working in harmony with natural ecosystems rather than consuming resources."
    },
    {
      icon: <Network className="w-8 h-8 text-secondary" />,
      title: "Decentralized Network",
      description: "A resilient network with no single point of failure, distributed through mycorrhizal-inspired connections."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Universal Communication",
      description: "AI-driven language preservation and translation, connecting cultures while protecting linguistic heritage."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-accent" />,
      title: "Regenerative Systems",
      description: "Technology that actively restores and regenerates natural environments rather than simply reducing harm."
    },
    {
      icon: <Shield className="w-8 h-8 text-secondary" />,
      title: "Inherent Security",
      description: "Biological encryption patterns that evolve and adapt, creating security measures as sophisticated as nature itself."
    }
  ];

  return (
    <section id="features" className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted" ref={featuresRef}>
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-5"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-primary/10 to-transparent rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-radial from-secondary/10 to-transparent rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-32 h-32 bg-gradient-radial from-accent/10 to-transparent rounded-full animate-float opacity-50" style={{ animationDelay: '2.8s' }}></div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="80%" y1="20%" x2="30%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="40%" y1="10%" x2="60%" y2="90%" stroke="url(#lineGradient)" strokeWidth="1" />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 inline-block px-4 py-1 bg-primary/10 rounded-full">Key Features</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Reimagining Technology</h3>
          <p className="max-w-2xl mx-auto text-foreground/80 text-lg">
            NzuriCore brings together the wisdom of ancient African knowledge systems with cutting-edge organic computing.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "feature-card group h-full", 
                activeFeature === index ? "ring-2 ring-primary/50 -translate-y-2" : ""
              )}
              ref={addToRefs}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-5 p-3 rounded-2xl bg-background/40 w-16 h-16 flex items-center justify-center glow-border group-hover:animate-pulse-soft">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-foreground/80 flex-grow">{feature.description}</p>
                
                {/* Animated indicator */}
                <div className="mt-4 flex items-center">
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50 group-hover:w-16 transition-all duration-300"></div>
                  <ArrowRight className="w-4 h-4 ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center" ref={addToRefs}>
          <div className="relative rounded-2xl p-8 bg-gradient-to-br from-background/80 to-muted border border-primary/10 shadow-lg max-w-3xl mx-auto overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl animate-pulse-soft opacity-70"></div>
            
            <div className="relative z-10">
              <h4 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Experience the Difference</h4>
              <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
                NzuriCore doesn't just improve on existing technology—it fundamentally rethinks what technology can be.
              </p>
              <Button className="bio-button relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Discover More
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer"></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
