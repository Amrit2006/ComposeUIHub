import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileCode, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertComponent } from "@shared/schema";

interface UploadedFile {
  name: string;
  size: number;
  content: string;
}

export default function UploadSection() {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [componentName, setComponentName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (component: InsertComponent) => {
      const response = await apiRequest('POST', '/api/components', component);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/components'] });
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your component has been uploaded successfully.",
      });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your component. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.name.endsWith('.kt') || file.name.endsWith('.java')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const newFile: UploadedFile = {
            name: file.name,
            size: file.size,
            content
          };
          setUploadedFiles(prev => [...prev, newFile]);
          console.log('File uploaded:', file.name);
        };
        reader.readAsText(file);
      }
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    console.log('File removed at index:', index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!componentName || !description || uploadedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload at least one file.",
        variant: "destructive",
      });
      return;
    }

    // Combine all uploaded file contents (take the main component code)
    const mainCode = uploadedFiles.map(file => file.content).join('\n\n');
    
    const componentData: InsertComponent = {
      name: componentName,
      description,
      category: category || 'Other',
      code: mainCode,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      authorName: 'Anonymous', // Could be made configurable
      previewImage: null
    };

    console.log('Submitting component:', componentData);
    uploadMutation.mutate(componentData);
  };

  if (submitted) {
    return (
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-16">
            <CardContent>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Component Uploaded Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your component will be reviewed and published soon.
              </p>
              <Button onClick={() => {
                setSubmitted(false);
                setComponentName("");
                setDescription("");
                setCategory("");
                setDifficulty("");
                setTags("");
                setUploadedFiles([]);
              }} data-testid="upload-another">
                Upload Another Component
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Share Your Component</h2>
          <p className="text-xl text-muted-foreground">
            Upload your Jetpack Compose components to help the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Component Details */}
            <Card>
              <CardHeader>
                <CardTitle>Component Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="component-name">Component Name *</Label>
                  <Input
                    id="component-name"
                    placeholder="e.g., Animated Loading Button"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    data-testid="component-name-input"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your component does and how to use it..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    data-testid="description-input"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger data-testid="category-select">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buttons">Buttons</SelectItem>
                        <SelectItem value="cards">Cards</SelectItem>
                        <SelectItem value="navigation">Navigation</SelectItem>
                        <SelectItem value="animations">Animations</SelectItem>
                        <SelectItem value="forms">Forms</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger data-testid="difficulty-select">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="material, animation, button (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    data-testid="tags-input"
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drop Zone */}
                <div
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                    ${dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input')?.click()}
                  data-testid="file-drop-zone"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Drop Kotlin files here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse (.kt, .java files)
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>

                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".kt,.java"
                  onChange={handleFileInput}
                  className="hidden"
                  data-testid="file-input"
                />

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <FileCode className="w-5 h-5 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          data-testid={`remove-file-${index}`}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={uploadMutation.isPending || !componentName || !description || uploadedFiles.length === 0}
              data-testid="submit-component"
              className="min-w-48"
            >
              {uploadMutation.isPending ? "Uploading..." : "Upload Component"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}