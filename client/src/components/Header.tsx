import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Moon, Sun, Upload } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    console.log('Theme toggled:', isDark ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <h1 className="text-xl font-semibold">Compose UI</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" data-testid="nav-components">Components</Button>
            <Button variant="ghost" data-testid="nav-upload">Upload</Button>
            <Button variant="ghost" data-testid="nav-docs">Docs</Button>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search components..." 
                className="pl-10 w-64" 
                data-testid="search-input"
                onChange={(e) => console.log('Search:', e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              data-testid="theme-toggle"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button className="hidden sm:flex" data-testid="upload-component">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}