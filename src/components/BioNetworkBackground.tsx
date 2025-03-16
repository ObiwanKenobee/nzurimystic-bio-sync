
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  connections: number[];
}

const BioNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        // Reinitialize nodes on resize
        initializeNodes();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
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

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const initializeNodes = () => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    const nodeCount = Math.floor(width * height / 25000); // Density factor
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.2 + 0.1,
        connections: []
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

  const animate = () => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;
    
    if (!ctx) return;
    
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
        let activationLevel = 0.2;  // Base opacity
        if (mousePosition) {
          const distToMouse = Math.sqrt(
            Math.pow(mousePosition.x - (node.x + connectedNode.x) / 2, 2) + 
            Math.pow(mousePosition.y - (node.y + connectedNode.y) / 2, 2)
          );
          // Increase activation for connections near mouse
          if (distToMouse < 150) {
            activationLevel = 0.2 + (1 - distToMouse / 150) * 0.6;
          }
        }
        
        // Draw connection with gradient
        const gradient = ctx.createLinearGradient(node.x, node.y, connectedNode.x, connectedNode.y);
        gradient.addColorStop(0, `rgba(42, 93, 42, ${activationLevel})`);
        gradient.addColorStop(0.5, `rgba(14, 165, 233, ${activationLevel * 1.2})`);
        gradient.addColorStop(1, `rgba(42, 93, 42, ${activationLevel})`);
        
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(connectedNode.x, connectedNode.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
    });
    ctx.restore();
    
    // Draw nodes
    ctx.save();
    nodes.forEach(node => {
      // Update position
      node.y += node.speed;
      if (node.y > height) {
        node.y = 0;
        node.x = Math.random() * width;
      }
      
      // Draw node
      ctx.beginPath();
      
      // Calculate distance to mouse (if mouse is present)
      let nodeSize = node.size;
      let activationLevel = 0.5;  // Base opacity
      
      if (mousePosition) {
        const distToMouse = Math.sqrt(
          Math.pow(mousePosition.x - node.x, 2) + 
          Math.pow(mousePosition.y - node.y, 2)
        );
        
        // Increase size and activation for nodes near mouse
        if (distToMouse < 100) {
          nodeSize = node.size + (1 - distToMouse / 100) * 3;
          activationLevel = 0.5 + (1 - distToMouse / 100) * 0.5;
        }
      }
      
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, nodeSize * 2
      );
      
      gradient.addColorStop(0, `rgba(42, 93, 42, ${activationLevel})`);
      gradient.addColorStop(1, 'rgba(42, 93, 42, 0)');
      
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
    />
  );
};

export default BioNetworkBackground;
