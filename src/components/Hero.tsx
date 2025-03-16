
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal hero with a slight delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    const handleScroll = () => {
      // Calculate scroll progress for parallax effects
      const scrollTop = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const progress = Math.min(scrollTop / (heroHeight * 0.5), 1);
      setScrollProgress(progress);
      
      // Apply parallax effect
      if (heroRef.current) {
        const parallaxElements = heroRef.current.querySelectorAll('.parallax');
        
        parallaxElements.forEach((element) => {
          const speed = parseFloat((element as HTMLElement).dataset.speed || "0.1");
          (element as HTMLElement).style.transform = `translateY(${scrollTop * speed}px)`;
        });
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!networkRef.current) return;
      
      const rect = networkRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      
      // Apply subtle 3D rotation to the hero content
      if (heroContentRef.current) {
        const rotateX = ((y - 50) / 50) * -3; // -3 to 3 degrees
        const rotateY = ((x - 50) / 50) * 3; // -3 to 3 degrees
        heroContentRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Enhanced neural network nodes data with descriptions
  const networkNodes = [
    { id: 1, x: 25, y: 30, title: "Bio-AI", description: "Neural networks inspired by natural ecosystems", color: "from-green-400 to-emerald-600" },
    { id: 2, x: 75, y: 40, title: "Decentralized Intelligence", description: "Self-governing computational systems", color: "from-blue-400 to-sky-600" },
    { id: 3, x: 50, y: 70, title: "Pan-African Digital Sovereignty", description: "Technology rooted in African innovation", color: "from-amber-400 to-yellow-600" },
    { id: 4, x: 35, y: 60, title: "Organic Computing", description: "Processing power from biological systems", color: "from-green-500 to-teal-700" },
    { id: 5, x: 65, y: 20, title: "Ecological Integration", description: "Technology that enhances natural environments", color: "from-emerald-400 to-green-600" }
  ];

  // Animate network connections based on mouse position with improved curves
  const getLineStyle = (x1: number, y1: number, x2: number, y2: number) => {
    const distance = Math.sqrt(Math.pow(x2 - mousePosition.x, 2) + Math.pow(y2 - mousePosition.y, 2));
    const mousePull = Math.max(0, 1 - distance / 50);
    
    // Calculate curved control points influenced by mouse position
    const midX = (x1 + x2) / 2 + (mousePosition.x - 50) * 0.1;
    const midY = (y1 + y2) / 2 + (mousePosition.y - 50) * 0.1;
    
    // Add slight curve variation
    const curveAmp = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 0.2;
    const curveX = midX + (Math.sin(Date.now() * 0.001) * curveAmp);
    const curveY = midY + (Math.cos(Date.now() * 0.001) * curveAmp);
    
    return {
      opacity: 0.2 + mousePull * 0.8,
      d: `M${x1},${y1} Q${curveX},${curveY} ${x2},${y2}`
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
      {/* Background Image and Overlay with improved gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=2000" 
          alt="Lush African landscape" 
          className="w-full h-full object-cover object-center scale-[1.02]" 
          style={{ 
            transform: `scale(${1.02 + scrollProgress * 0.1}) translateY(${scrollProgress * -20}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/95"></div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Neural Network Layer with improved interactivity */}
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
              {/* Outer glow */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={activeNode === node.id ? "20" : "12"}
                fill={`url(#gradient-${node.id})`}
                opacity="0.4"
                className="transition-all duration-500 animate-pulse-soft"
                style={{ animationDelay: `${node.id * 0.2}s` }}
              />
              
              {/* Main circle */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={activeNode === node.id ? "10" : "6"}
                fill={`url(#gradient-${node.id})`}
                className="transition-all duration-300 animate-pulse-soft"
                style={{ animationDelay: `${node.id * 0.2 + 0.1}s` }}
              />
              
              {/* Center dot */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3"
                fill="#ffffff"
                className="transition-all duration-300"
              />
              
              {/* Node gradients */}
              <defs>
                <radialGradient id={`gradient-${node.id}`}>
                  <stop offset="0%" stopColor={activeNode === node.id ? "#4ade80" : "#22c55e"} />
                  <stop offset="100%" stopColor={activeNode === node.id ? "#0ea5e9" : "#0284c7"} />
                </radialGradient>
              </defs>
            </g>
          ))}
        </svg>
        
        {/* Node information with improved styling */}
        {activeNode && (
          <div 
            className="absolute backdrop-blur-sm bg-black/30 border border-primary/30 rounded-lg p-4 text-white animate-fade-in-up shadow-lg max-w-xs"
            style={{ 
              left: `calc(${networkNodes.find(n => n.id === activeNode)?.x}% - 100px)`,
              top: `calc(${networkNodes.find(n => n.id === activeNode)?.y}% + 20px)`,
              transform: 'translateZ(0)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h4 className="text-emphasis font-medium mb-1 text-balance bg-gradient-to-r bg-clip-text text-transparent from-white to-white/90">{networkNodes.find(n => n.id === activeNode)?.title}</h4>
            <p className="text-subtle text-sm">{networkNodes.find(n => n.id === activeNode)?.description}</p>
            <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent"></div>
          </div>
        )}
      </div>

      {/* Content Container with subtle 3D effect */}
      <div className="container mx-auto px-4 md:px-8 z-10 mt-10">
        <div 
          ref={heroContentRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease-out' }}
        >
          {/* Tag line with improved styling */}
          <div className="inline-block mb-6 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary backdrop-blur-sm border border-primary/20 animate-fade-in-up depth-effect">
            The Future of Bio-Technology
          </div>

          {/* Main headline with enhanced gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight parallax text-white drop-shadow-md" data-speed="-0.05">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift">NzuriCore:</span> <br className="md:hidden" />
            <span className="text-gradient-subtle">Where Nature Meets Intelligence</span>
          </h1>

          {/* Subtext with improved readability */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto parallax drop-shadow-md text-balance leading-relaxed" data-speed="0.1">
            Harnessing the power of Africa's ecosystems to revolutionize computing, creating sustainable technology that works in harmony with nature.
          </p>

          {/* CTA buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 parallax" data-speed="0.2">
            <button 
              className="bio-button relative group overflow-hidden depth-effect"
              onClick={scrollToAbout}
            >
              <span className="relative z-10 flex items-center font-medium">
                Explore the Future
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer"></span>
            </button>
            <button className="bio-button bio-button-accent depth-effect group">
              <span className="relative z-10 group-hover:tracking-wide transition-all duration-300">Learn More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator with improved animation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="w-1 h-12 rounded-full relative overflow-hidden border border-white/30 bg-white/5 backdrop-blur-sm">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary rounded-full" 
            style={{ 
              height: '50%', 
              animation: 'scrollIndicator 2s ease-in-out infinite',
              boxShadow: '0 0 10px rgba(14, 165, 233, 0.5)'
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
