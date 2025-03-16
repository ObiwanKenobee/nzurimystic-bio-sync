
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import InteractiveMap from "@/components/InteractiveMap";
import Vision from "@/components/Vision";
import Join from "@/components/Join";
import Footer from "@/components/Footer";
import BioNetworkBackground from "@/components/BioNetworkBackground";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("hero");
  
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Add page loaded animation with a slight delay for better effect
    setTimeout(() => {
      document.body.classList.add('animate-fade-in-up');
      setIsLoaded(true);
      
      // Welcome toast notification
      toast({
        title: "Welcome to NzuriCore",
        description: "Explore the future of bio-intelligent computing",
        duration: 5000,
      });
    }, 500);
    
    // Intersection Observer for section tracking
    const sections = ["hero", "about", "features", "map", "vision", "join"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id || entry.target.getAttribute('data-section') || "");
        }
      });
    }, observerOptions);
    
    // Observe each section
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
      if (section) {
        sectionObserver.observe(section);
      }
    });
    
    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col relative transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Bio-network background that appears across the entire site */}
      <BioNetworkBackground />
      
      {/* Pass current section to Navbar for highlighting active links */}
      <Navbar currentSection={currentSection} />
      
      <main className="flex-grow relative z-10">
        <div data-section="hero">
          <Hero />
        </div>
        <About />
        <Features />
        <InteractiveMap />
        <Vision />
        <Join />
      </main>
      
      {/* Organic transition to footer */}
      <div className="h-16 bg-gradient-to-b from-transparent to-background/80"></div>
      <Footer />
    </div>
  );
};

export default Index;
