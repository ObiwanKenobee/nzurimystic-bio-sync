
import { Link } from "react-router-dom";
import { ArrowUp, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-muted/50 border-t border-border/30 pt-16 pb-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-muted/80 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse-soft"></div>
                </div>
              </div>
              <span className="text-lg font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                NzuriCore
              </span>
            </div>
            <p className="text-sm text-foreground/70 mb-6 max-w-xs">
              Harnessing the power of Africa's ecosystems to revolutionize computing and create a sustainable technological future.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-primary/20 hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-primary/20 hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-primary/20 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-primary/20 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/research" className="text-foreground/70 hover:text-primary transition-colors">Research</Link>
              </li>
              <li>
                <Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/partners" className="text-foreground/70 hover:text-primary transition-colors">Partners</Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/newsletters" className="text-foreground/70 hover:text-primary transition-colors">Newsletters</Link>
              </li>
              <li>
                <Link to="/documentation" className="text-foreground/70 hover:text-primary transition-colors">Documentation</Link>
              </li>
              <li>
                <Link to="/press" className="text-foreground/70 hover:text-primary transition-colors">Press Kit</Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground/70 hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-foreground/70 hover:text-primary transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/licenses" className="text-foreground/70 hover:text-primary transition-colors">Licenses</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} NzuriCore. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button onClick={scrollToTop} className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
              Back to top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
