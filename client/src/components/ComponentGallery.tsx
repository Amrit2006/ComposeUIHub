import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import ComponentCard from "./ComponentCard";

const categories = [
  { name: "All", count: 24 },
  { name: "Buttons", count: 8 },
  { name: "Cards", count: 6 },
  { name: "Navigation", count: 4 },
  { name: "Animations", count: 6 }
];

//todo: remove mock functionality
const mockComponents = [
  {
    title: "Floating Action Button",
    description: "An elevated button that triggers the primary action in your app",
    category: "Buttons",
    difficulty: "Beginner" as const,
    previewCode: `@Composable
fun FloatingActionButton() {
    FloatingActionButton(
        onClick = { }
    ) {
        Icon(Icons.Default.Add, "Add")
    }
}`,
    fullCode: `@Composable
fun CustomFloatingActionButton(
    onClick: () -> Unit,
    icon: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier
) {
    FloatingActionButton(
        onClick = onClick,
        modifier = modifier,
        backgroundColor = MaterialTheme.colors.primary
    ) {
        Icon(
            imageVector = icon,
            contentDescription = contentDescription,
            tint = MaterialTheme.colors.onPrimary
        )
    }
}`,
    tags: ["FAB", "Material", "Action"]
  },
  {
    title: "Animated Card",
    description: "A card with smooth animations and gesture support",
    category: "Cards",
    difficulty: "Intermediate" as const,
    previewCode: `@Composable
fun AnimatedCard() {
    Card(
        modifier = Modifier
            .animateContentSize()
    ) {
        // Card content
    }
}`,
    fullCode: `@Composable
fun AnimatedCard(
    expanded: Boolean,
    onExpandClick: () -> Unit,
    title: String,
    content: String
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize(
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy,
                    stiffness = Spring.StiffnessLow
                )
            )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.h6
                )
                IconButton(onClick = onExpandClick) {
                    Icon(
                        imageVector = if (expanded) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore,
                        contentDescription = null
                    )
                }
            }
            if (expanded) {
                Text(
                    text = content,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }
        }
    }
}`,
    tags: ["Animation", "Card", "Expandable"]
  },
  {
    title: "Bottom Navigation",
    description: "Material Design bottom navigation with smooth transitions",
    category: "Navigation",
    difficulty: "Advanced" as const,
    previewCode: `@Composable
fun BottomNavigation() {
    BottomNavigation {
        // Navigation items
    }
}`,
    fullCode: `@Composable
fun CustomBottomNavigation(
    items: List<BottomNavItem>,
    selectedItem: Int,
    onItemSelected: (Int) -> Unit
) {
    BottomNavigation(
        backgroundColor = MaterialTheme.colors.surface,
        contentColor = MaterialTheme.colors.onSurface
    ) {
        items.forEachIndexed { index, item ->
            BottomNavigationItem(
                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = item.label
                    )
                },
                label = { Text(item.label) },
                selected = selectedItem == index,
                onClick = { onItemSelected(index) },
                selectedContentColor = MaterialTheme.colors.primary,
                unselectedContentColor = MaterialTheme.colors.onSurface.copy(alpha = 0.6f)
            )
        }
    }
}`,
    tags: ["Navigation", "Material", "Bottom"]
  }
];

export default function ComponentGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = mockComponents.filter(component => {
    const matchesCategory = selectedCategory === "All" || component.category === selectedCategory;
    const matchesSearch = component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              {categories.map((category) => (
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
                    {category.count}
                  </Badge>
                </Button>
              ))}
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
        {filteredComponents.length > 0 ? (
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