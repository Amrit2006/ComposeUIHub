import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import ComponentCard from "./ComponentCard";
import type { Component } from "@shared/schema";

const categories = [
  { name: "All" },
  { name: "Buttons" },
  { name: "Cards" },
  { name: "Navigation" },
  { name: "Animations" }
];

// Transform API component to ComponentCard props
const transformComponent = (component: Component) => ({
  title: component.name,
  description: component.description,
  category: component.category,
  difficulty: 'Intermediate' as const, // Default for now
  previewCode: component.code.split('\n').slice(0, 8).join('\n') + '\n    // ...',
  fullCode: component.code,
  tags: component.tags || []
});

export default function ComponentGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch components from API
  const { data: components = [], isLoading } = useQuery<Component[]>({
    queryKey: ['/api/components', selectedCategory],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "All") {
        params.append('category', selectedCategory);
      }
      const url = `/api/components${params.toString() ? '?' + params.toString() : ''}`;
      return fetch(url).then(res => res.json());
    },
  });

  // Filter components by search query
  const filteredComponents = components
    .filter(component => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return component.name.toLowerCase().includes(query) ||
             component.description.toLowerCase().includes(query) ||
             component.tags?.some(tag => tag.toLowerCase().includes(query));
    })
    .map(transformComponent);

  return (
    <section id="components" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Jetpack Compose Components
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Copy-paste beautiful, production-ready components for your Android app
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search components..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  console.log('Gallery search:', e.target.value);
                }}
                data-testid="gallery-search"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = category.name === "All" 
                  ? components.length 
                  : components.filter(c => c.category === category.name).length;
                
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      console.log('Category selected:', category.name);
                    }}
                    data-testid={`category-${category.name.toLowerCase()}`}
                    className="gap-1"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
            </p>
            <Button variant="outline" size="sm" data-testid="filter-options">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Component Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-80">
                <CardContent className="p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-20 bg-muted rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-6 bg-muted rounded w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component, index) => (
              <ComponentCard key={index} {...component} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No components found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}