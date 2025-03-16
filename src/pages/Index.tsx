
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import InteractiveMap from "@/components/InteractiveMap";
import Vision from "@/components/Vision";
import Join from "@/components/Join";
import Footer from "@/components/Footer";
import BioNetworkBackground from "@/components/BioNetworkBackground";

const Index = () => {
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

    // Add page loaded animation
    document.body.classList.add('animate-fade-in-up');
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Bio-network background that appears across the entire site */}
      <BioNetworkBackground />
      
      <Navbar />
      
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Features />
        <InteractiveMap />
        <Vision />
        <Join />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
