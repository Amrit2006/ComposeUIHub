import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Heart, Code2 } from "lucide-react";

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`);
    // In a real app, this would navigate to the social platform
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Compose UI</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ultimate collection of Jetpack Compose UI components for Android developers.
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleSocialClick('Github')}
                data-testid="footer-github"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleSocialClick('Twitter')}
                data-testid="footer-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Components */}
          <div className="space-y-4">
            <h4 className="font-semibold">Components</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-buttons">Buttons</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-cards">Cards</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-navigation">Navigation</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-animations">Animations</Button></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-docs">Documentation</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-examples">Examples</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-tutorials">Tutorials</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-community">Community</Button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-help">Help Center</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-contact">Contact Us</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-contribute">Contribute</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto font-normal" data-testid="footer-license">License</Button></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 Compose UI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            for the Android community
          </div>
        </div>
      </div>
    </footer>
  );
}