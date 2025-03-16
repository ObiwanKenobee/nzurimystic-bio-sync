
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

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
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!networkRef.current) return;
      
      const rect = networkRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Neural network nodes data
  const networkNodes = [
    { id: 1, x: 25, y: 30, title: "Bio-AI", description: "Neural networks inspired by natural ecosystems" },
    { id: 2, x: 75, y: 40, title: "Decentralized Intelligence", description: "Self-governing computational systems" },
    { id: 3, x: 50, y: 70, title: "Pan-African Digital Sovereignty", description: "Technology rooted in African innovation" },
    { id: 4, x: 35, y: 60, title: "Organic Computing", description: "Processing power from biological systems" },
    { id: 5, x: 65, y: 20, title: "Ecological Integration", description: "Technology that enhances natural environments" }
  ];

  // Animate network connections based on mouse position
  const getLineStyle = (x1: number, y1: number, x2: number, y2: number) => {
    const distance = Math.sqrt(Math.pow(x2 - mousePosition.x, 2) + Math.pow(y2 - mousePosition.y, 2));
    const mousePull = Math.max(0, 1 - distance / 50);
    
    // Calculate curved control points influenced by mouse position
    const midX = (x1 + x2) / 2 + (mousePosition.x - 50) * 0.05;
    const midY = (y1 + y2) / 2 + (mousePosition.y - 50) * 0.05;
    
    return {
      opacity: 0.2 + mousePull * 0.8,
      d: `M${x1},${y1} Q${midX},${midY} ${x2},${y2}`
    };
  };

  // Function to render network connections
  const renderConnections = () => {
    return networkNodes.map((node, i) => 
      networkNodes.slice(i + 1).map((otherNode, j) => (
        <path
          key={`${node.id}-${otherNode.id}`}
          d={getLineStyle(node.x, node.y, otherNode.x, otherNode.y).d}
          stroke={`rgba(34, 197, 94, ${getLineStyle(node.x, node.y, otherNode.x, otherNode.y).opacity})`}
          strokeWidth="1"
          fill="none"
          className="transition-all duration-300"
        />
      ))
    );
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

      {/* Neural Network Layer */}
      <div 
        ref={networkRef}
        className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
      >
        <svg className="w-full h-full">
          {/* Dynamic connections */}
          {renderConnections()}
          
          {/* Network nodes */}
          {networkNodes.map((node) => (
            <g 
              key={node.id} 
              className="cursor-pointer pointer-events-auto"
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            >
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={activeNode === node.id ? "15" : "8"}
                fill={activeNode === node.id ? "rgba(34, 197, 94, 0.8)" : "rgba(34, 197, 94, 0.5)"}
                className="transition-all duration-300 animate-pulse-soft"
                style={{ animationDelay: `${node.id * 0.2}s` }}
              />
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="4"
                fill="#ffffff"
                className="transition-all duration-300"
              />
            </g>
          ))}
        </svg>
        
        {/* Node information */}
        {activeNode && (
          <div 
            className="absolute backdrop-blur-sm bg-black/20 border border-primary/30 rounded-lg p-4 text-white animate-fade-in-up shadow-lg max-w-xs"
            style={{ 
              left: `calc(${networkNodes.find(n => n.id === activeNode)?.x}% - 100px)`,
              top: `calc(${networkNodes.find(n => n.id === activeNode)?.y}% + 20px)`
            }}
          >
            <h4 className="text-emphasis font-medium mb-1 text-balance">{networkNodes.find(n => n.id === activeNode)?.title}</h4>
            <p className="text-subtle text-sm">{networkNodes.find(n => n.id === activeNode)?.description}</p>
          </div>
        )}
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
            <span className="text-gradient-subtle">Where Nature Meets Intelligence</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto parallax drop-shadow-md text-balance" data-speed="0.1">
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
