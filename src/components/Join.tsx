
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Join = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      
      toast({
        title: "Thank you for joining!",
        description: "You're now part of the NzuriCore community.",
      });
    }, 1500);
  };

  return (
    <section id="join" className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-muted">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-secondary/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
            {/* Glowing orb decoration */}
            <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl"></div>
            <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Section header */}
              <div className="text-center mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Join the Movement</h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Future</h3>
                <p className="max-w-2xl mx-auto text-foreground/80">
                  Subscribe to our newsletter to receive updates on NzuriCore's development and be the first to experience our technology.
                </p>
              </div>

              {/* Newsletter signup */}
              <div className="max-w-md mx-auto">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="relative">
                    <div className="relative">
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-5 py-4 pr-36 rounded-full bg-background/50 border border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 backdrop-blur-sm text-foreground outline-none"
                        disabled={isSubmitting}
                      />
                      <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bio-button bio-button-secondary h-10 px-5"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? 'Submitting...' : 'Subscribe'}
                          <Send className="ml-2 w-4 h-4" />
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-foreground/60 mt-2 text-center">
                      By subscribing, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                ) : (
                  <div className="text-center animate-fade-in-up">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Thank You!</h4>
                    <p className="text-foreground/80">
                      You've successfully joined the NzuriCore community. Look out for updates in your inbox.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Subscribe another email
                    </button>
                  </div>
                )}
              </div>
              
              {/* Community stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">12K+</div>
                  <div className="text-sm text-foreground/70">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary">24</div>
                  <div className="text-sm text-foreground/70">Countries Represented</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent">7</div>
                  <div className="text-sm text-foreground/70">Research Labs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">2026</div>
                  <div className="text-sm text-foreground/70">Launch Year</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional ways to join */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <h4 className="text-lg font-bold mb-2">Join the Forum</h4>
              <p className="text-foreground/80 text-sm mb-4">
                Connect with other visionaries and contribute to discussions about bio-technology.
              </p>
              <div className="mt-auto">
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                  Visit Forum →
                </button>
              </div>
            </div>
            <div className="feature-card">
              <h4 className="text-lg font-bold mb-2">Become a Partner</h4>
              <p className="text-foreground/80 text-sm mb-4">
                Organizations looking to collaborate on bio-technology initiatives can apply for partnership.
              </p>
              <div className="mt-auto">
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
            <div className="feature-card">
              <h4 className="text-lg font-bold mb-2">Explore Careers</h4>
              <p className="text-foreground/80 text-sm mb-4">
                Join our team of researchers, engineers, and visionaries building the future.
              </p>
              <div className="mt-auto">
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                  View Openings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
