
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentSection?: string;
}

const Navbar = ({ currentSection = "" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationLinks = [
    { name: "Home", path: "/", section: "hero" },
    { name: "About", path: "/#about", section: "about" },
    { name: "Features", path: "/#features", section: "features" },
    { name: "Map", path: "/#map", section: "map" },
    { name: "Vision", path: "/#vision", section: "vision" },
    { name: "Join Us", path: "/#join", section: "join" },
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavigation = (path: string) => {
    if (path.includes('#')) {
      const id = path.split('#')[1];
      scrollToSection(id);
    } else {
      navigate(path);
    }
  };

  const isActive = (linkSection: string) => {
    return currentSection === linkSection || 
           (location.pathname === "/" && linkSection === "hero" && !currentSection);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 md:py-5 px-4 md:px-8 transition-all duration-500",
        isScrolled ? "navbar-blur" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center depth-effect">
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse-soft"></div>
            </div>
          </div>
          <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            NzuriCore
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 items-center">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.path)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/10",
                isActive(link.section)
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-foreground/80"
              )}
            >
              {link.name}
            </button>
          ))}
          <button className="bio-button bio-button-secondary ml-4">
            <span className="relative z-10">Connect</span>
          </button>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-foreground p-1 rounded-full hover:bg-primary/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/40 py-4 px-4 flex flex-col space-y-1 animate-fade-in-up">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.path)}
              className={cn(
                "px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-300 hover:bg-primary/10",
                isActive(link.section)
                  ? "text-primary font-semibold"
                  : "text-foreground/80"
              )}
            >
              {link.name}
            </button>
          ))}
          <button className="bio-button bio-button-secondary mt-2 w-full">
            <span className="relative z-10">Connect</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
