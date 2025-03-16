
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  connections: number[];
  pulseSpeed: number;
  pulsePhase: number;
  hue: number;
}

const BioNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isInViewportRef = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        setDimensions({ width, height });
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        
        // Scale the canvas context to account for the device pixel ratio
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        
        // Reinitialize nodes on resize
        initializeNodes();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current && isInViewportRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    const handleVisibilityChange = () => {
      isInViewportRef.current = !document.hidden;
    };
    
    const checkIfInViewport = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        isInViewportRef.current = (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
      }
    };

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', checkIfInViewport);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', checkIfInViewport);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const initializeNodes = () => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    const nodeCount = Math.floor(width * height / 20000); // Adjusted density for better performance
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.15 + 0.05, // Slightly slower for more natural movement
        connections: [],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() * 60 + 120, // Green to blue hue range
      };
      nodes.push(node);
    }

    // Create connections (connect to closest nodes)
    nodes.forEach(node => {
      const distances = nodes
        .filter(n => n.id !== node.id)
        .map(n => ({
          id: n.id,
          distance: Math.sqrt(Math.pow(n.x - node.x, 2) + Math.pow(n.y - node.y, 2))
        }))
        .sort((a, b) => a.distance - b.distance);
      
      // Connect to 2-4 closest nodes
      const connectionCount = Math.floor(Math.random() * 3) + 2;
      node.connections = distances.slice(0, connectionCount).map(d => d.id);
    });

    nodesRef.current = nodes;
  };

  const animate = (timestamp: number) => {
    if (!canvasRef.current || !isInViewportRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = dimensions;
    
    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw nodes
    const nodes = nodesRef.current;
    
    // Draw connections first (behind nodes)
    ctx.save();
    nodes.forEach(node => {
      node.connections.forEach(connId => {
        const connectedNode = nodes.find(n => n.id === connId);
        if (!connectedNode) return;
        
        // Calculate distance to mouse (if mouse is present)
        let activationLevel = 0.15;  // Base opacity (reduced for subtlety)
        if (mousePosition) {
          const distToMouse = Math.sqrt(
            Math.pow(mousePosition.x - (node.x + connectedNode.x) / 2, 2) + 
            Math.pow(mousePosition.y - (node.y + connectedNode.y) / 2, 2)
          );
          // Increase activation for connections near mouse
          if (distToMouse < 150) {
            activationLevel = 0.15 + (1 - distToMouse / 150) * 0.5;
          }
        }
        
        // Calculate pulse effect based on time
        const pulseEffect = Math.sin(timestamp * node.pulseSpeed + node.pulsePhase) * 0.1 + 0.9;
        activationLevel *= pulseEffect;
        
        // Draw connection with gradient
        const gradient = ctx.createLinearGradient(node.x, node.y, connectedNode.x, connectedNode.y);
        gradient.addColorStop(0, `hsla(${node.hue}, 70%, 40%, ${activationLevel})`);
        gradient.addColorStop(0.5, `hsla(${(node.hue + connectedNode.hue) / 2}, 80%, 50%, ${activationLevel * 1.2})`);
        gradient.addColorStop(1, `hsla(${connectedNode.hue}, 70%, 40%, ${activationLevel})`);
        
        ctx.beginPath();
        
        // Curved connections for more organic feel
        const midX = (node.x + connectedNode.x) / 2;
        const midY = (node.y + connectedNode.y) / 2;
        const curveFactor = 20;
        const curveX = midX + (Math.random() - 0.5) * curveFactor;
        const curveY = midY + (Math.random() - 0.5) * curveFactor;
        
        ctx.moveTo(node.x, node.y);
        ctx.quadraticCurveTo(curveX, curveY, connectedNode.x, connectedNode.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.4 * pulseEffect; // Thinner lines for elegance
        ctx.stroke();
      });
    });
    ctx.restore();
    
    // Draw nodes
    ctx.save();
    nodes.forEach(node => {
      // Update position with slight wobble for organic movement
      const wobbleX = Math.sin(timestamp * 0.001 + node.id) * 0.3;
      node.y += node.speed + wobbleX * 0.1;
      node.x += wobbleX;
      
      if (node.y > height) {
        node.y = 0;
        node.x = Math.random() * width;
      }
      
      // Draw node
      ctx.beginPath();
      
      // Calculate distance to mouse (if mouse is present)
      let nodeSize = node.size;
      let activationLevel = 0.4;  // Base opacity
      
      if (mousePosition) {
        const distToMouse = Math.sqrt(
          Math.pow(mousePosition.x - node.x, 2) + 
          Math.pow(mousePosition.y - node.y, 2)
        );
        
        // Increase size and activation for nodes near mouse
        if (distToMouse < 100) {
          nodeSize = node.size + (1 - distToMouse / 100) * 3;
          activationLevel = 0.4 + (1 - distToMouse / 100) * 0.4;
        }
      }
      
      // Calculate pulse effect
      const pulseEffect = Math.sin(timestamp * node.pulseSpeed + node.pulsePhase) * 0.2 + 0.8;
      nodeSize *= pulseEffect;
      activationLevel *= pulseEffect;
      
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, nodeSize * 2
      );
      
      gradient.addColorStop(0, `hsla(${node.hue}, 70%, 50%, ${activationLevel})`);
      gradient.addColorStop(1, `hsla(${node.hue}, 70%, 40%, 0)`);
      
      ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    ctx.restore();
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15"
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export default BioNetworkBackground;
