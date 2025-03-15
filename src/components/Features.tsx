
import { useEffect, useRef } from "react";
import { 
  Zap, 
  Leaf, 
  Network, 
  Globe, 
  RefreshCw,
  Shield
} from "lucide-react";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const animatedElementsRef = useRef<HTMLDivElement[]>([]);

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
    <section id="features" className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-muted" ref={featuresRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-secondary/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Key Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Reimagining Technology</h3>
          <p className="max-w-2xl mx-auto text-foreground/80">
            NzuriCore brings together the wisdom of ancient African knowledge systems with cutting-edge organic computing.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group h-full"
              ref={addToRefs}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-5 p-3 rounded-2xl bg-background/40 w-16 h-16 flex items-center justify-center glow-border">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-foreground/80 flex-grow">{feature.description}</p>
                
                {/* Subtle indicator */}
                <div className="mt-4 w-12 h-1 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center" ref={addToRefs}>
          <div className="inline-block rounded-xl p-6 bg-gradient-to-br from-background to-muted border border-primary/10 shadow-lg max-w-3xl mx-auto">
            <h4 className="text-2xl font-bold mb-4">Experience the Difference</h4>
            <p className="text-foreground/80 mb-6">
              NzuriCore doesn't just improve on existing technology—it fundamentally rethinks what technology can be.
            </p>
            <button className="bio-button">
              <span className="relative z-10">Discover More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
