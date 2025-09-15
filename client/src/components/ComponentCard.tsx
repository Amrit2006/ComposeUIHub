import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ComponentCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  previewCode: string;
  fullCode: string;
  tags: string[];
}

export default function ComponentCard({
  title,
  description,
  category,
  difficulty,
  previewCode,
  fullCode,
  tags
}: ComponentCardProps) {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    console.log('Code copied for:', title);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreview = () => {
    setIsCodeVisible(!isCodeVisible);
    console.log('Preview toggled for:', title);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Card className="hover-elevate group transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg" data-testid={`component-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <Badge variant="outline" className="shrink-0">
            {category}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(difficulty)} data-testid={`difficulty-${difficulty.toLowerCase()}`}>
            {difficulty}
          </Badge>
          <div className="flex gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Component Preview */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4 border">
          <div className="flex items-center justify-center h-32">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Component Preview</div>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        {isCodeVisible && (
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="bg-muted px-3 py-2 text-xs font-mono text-muted-foreground border-b">
              {title}.kt
            </div>
            <pre className="p-3 text-xs font-mono overflow-x-auto max-h-32">
              <code>{previewCode}</code>
            </pre>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreview}
            data-testid={`preview-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isCodeVisible ? 'Hide' : 'Preview'}
          </Button>
          <Button 
            size="sm" 
            onClick={handleCopyCode}
            data-testid={`copy-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex-1"
            variant={copied ? "secondary" : "default"}
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}