import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Smartphone, Code2, Palette } from "lucide-react";
import phoneImage from "@assets/generated_images/Android_phone_mockup_showcase_634537b0.png";

export default function HeroSection() {
  const handleGetStarted = () => {
    console.log('Get started clicked');
    // Scroll to components section
    document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrowseComponents = () => {
    console.log('Browse components clicked');
    // Navigate to components
    document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="mb-4" data-testid="hero-badge">
                <Smartphone className="w-3 h-3 mr-1" />
                Jetpack Compose
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Build beautiful 
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Android UIs
                </span> 
                in minutes
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Copy-paste the most trending Jetpack Compose components and use them in your Android apps without worrying about styling and animations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                data-testid="get-started-btn"
                className="group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleBrowseComponents}
                data-testid="browse-components-btn"
              >
                Browse Components
              </Button>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center gap-6 pt-8">
              <span className="text-sm text-muted-foreground">Built with:</span>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  <Code2 className="w-3 h-3 mr-1" />
                  Kotlin
                </Badge>
                <Badge variant="secondary">
                  <Palette className="w-3 h-3 mr-1" />
                  Material Design
                </Badge>
                <Badge variant="secondary">
                  <Smartphone className="w-3 h-3 mr-1" />
                  Compose
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={phoneImage} 
                alt="Android phone displaying Jetpack Compose components" 
                className="w-80 lg:w-96 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                data-testid="hero-phone-mockup"
              />
              
              {/* Floating Component Cards */}
              <div className="absolute -top-4 -left-8 animate-bounce delay-300">
                <div className="bg-card border rounded-lg p-3 shadow-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded" />
                  <div className="text-xs mt-1 text-muted-foreground">Button</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-8 animate-bounce delay-700">
                <div className="bg-card border rounded-lg p-3 shadow-lg">
                  <div className="w-8 h-8 bg-accent/20 rounded" />
                  <div className="text-xs mt-1 text-muted-foreground">Card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}