import { type User, type InsertUser, type Component, type InsertComponent } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getComponents(category?: string): Promise<Component[]>;
  getComponent(id: string): Promise<Component | undefined>;
  createComponent(component: InsertComponent): Promise<Component>;
  searchComponents(query: string): Promise<Component[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private components: Map<string, Component>;

  constructor() {
    this.users = new Map();
    this.components = new Map();
    this.seedComponents();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getComponents(category?: string): Promise<Component[]> {
    const allComponents = Array.from(this.components.values());
    if (category && category !== "All") {
      return allComponents.filter(component => component.category === category);
    }
    return allComponents;
  }

  async getComponent(id: string): Promise<Component | undefined> {
    return this.components.get(id);
  }

  async createComponent(insertComponent: InsertComponent): Promise<Component> {
    const id = randomUUID();
    const component: Component = { 
      ...insertComponent, 
      id, 
      createdAt: new Date() 
    };
    this.components.set(id, component);
    return component;
  }

  async searchComponents(query: string): Promise<Component[]> {
    const allComponents = Array.from(this.components.values());
    const searchTerm = query.toLowerCase();
    return allComponents.filter(component => 
      component.name.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm) ||
      component.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  private seedComponents() {
    const sampleComponents: InsertComponent[] = [
      {
        name: "Material Button",
        category: "Buttons",
        description: "A beautiful Material Design button with ripple effect and customizable colors",
        code: `@Composable
fun MaterialButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    colors: ButtonColors = ButtonDefaults.buttonColors()
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        colors = colors,
        elevation = ButtonDefaults.buttonElevation(
            defaultElevation = 4.dp,
            pressedElevation = 8.dp
        )
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.button
        )
    }
}`,
        previewImage: null,
        tags: ["material", "button", "ripple"],
        authorName: "Android Team"
      },
      {
        name: "Animated Card",
        category: "Cards",
        description: "An elevated card with smooth animations and hover effects",
        code: `@Composable
fun AnimatedCard(
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {},
    content: @Composable ColumnScope.() -> Unit
) {
    var isPressed by remember { mutableStateOf(false) }
    
    Card(
        modifier = modifier
            .scale(if (isPressed) 0.95f else 1f)
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null
            ) {
                onClick()
            }
            .pointerInput(Unit) {
                detectTapGestures(
                    onPress = {
                        isPressed = true
                        tryAwaitRelease()
                        isPressed = false
                    }
                )
            },
        elevation = CardDefaults.cardElevation(
            defaultElevation = if (isPressed) 2.dp else 6.dp
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            content = content
        )
    }
}`,
        previewImage: null,
        tags: ["animation", "card", "interactive"],
        authorName: "UI Designer"
      },
      {
        name: "Bottom Navigation",
        category: "Navigation",
        description: "A clean bottom navigation bar with Material Design icons",
        code: `@Composable
fun BottomNavigation(
    items: List<BottomNavItem>,
    selectedItem: Int,
    onItemSelected: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    NavigationBar(modifier = modifier) {
        items.forEachIndexed { index, item ->
            NavigationBarItem(
                icon = {
                    Icon(
                        imageVector = if (selectedItem == index) item.selectedIcon else item.unselectedIcon,
                        contentDescription = item.label
                    )
                },
                label = { Text(item.label) },
                selected = selectedItem == index,
                onClick = { onItemSelected(index) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = MaterialTheme.colorScheme.primary,
                    unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant
                )
            )
        }
    }
}

data class BottomNavItem(
    val label: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector
)`,
        previewImage: null,
        tags: ["navigation", "bottom", "material"],
        authorName: "Navigation Expert"
      },
      {
        name: "Fade In Animation",
        category: "Animations",
        description: "Smooth fade-in animation for any composable with customizable duration",
        code: `@Composable
fun FadeInAnimation(
    durationMillis: Int = 300,
    delayMillis: Int = 0,
    content: @Composable () -> Unit
) {
    val alpha by animateFloatAsState(
        targetValue = 1f,
        animationSpec = tween(
            durationMillis = durationMillis,
            delayMillis = delayMillis,
            easing = FastOutSlowInEasing
        ),
        label = "fadeIn"
    )
    
    Box(
        modifier = Modifier.alpha(alpha)
    ) {
        content()
    }
}`,
        previewImage: null,
        tags: ["animation", "fade", "alpha"],
        authorName: "Animation Studio"
      }
    ];

    sampleComponents.forEach(component => {
      const id = randomUUID();
      const fullComponent: Component = { 
        ...component, 
        id, 
        createdAt: new Date() 
      };
      this.components.set(id, fullComponent);
    });
  }
}

export const storage = new MemStorage();
