# Design Guidelines for Jetpack Compose Component Showcase

## Design Approach
**Reference-Based Approach**: Inspired by ui.aceternity.com's modern, sleek aesthetic combined with Google's Material Design principles for Android consistency.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary (Default)**:
- Background: 220 15% 8% (deep dark blue-gray)
- Surface: 220 20% 12% (elevated dark surface)
- Primary: 210 100% 60% (vibrant blue, Android brand alignment)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 220 10% 70% (muted gray)
- Border: 220 20% 20% (subtle borders)

**Light Mode**:
- Background: 0 0% 98% (clean white)
- Surface: 0 0% 100% (pure white)
- Primary: 210 100% 50% (rich blue)
- Text Primary: 220 20% 15% (dark gray)
- Text Secondary: 220 10% 40% (medium gray)
- Border: 220 15% 85% (light borders)

**Gradients**: Subtle blue-to-purple gradients (210 100% 60% to 250 80% 65%) for hero backgrounds and component highlights.

### B. Typography
- **Primary**: Inter (clean, modern, excellent for code)
- **Code**: JetBrains Mono (official JetBrains font for code snippets)
- **Hierarchy**: Use font weights 400, 500, 600, 700 with sizes from text-sm to text-6xl

### C. Layout System
**Tailwind Spacing**: Consistent use of 4, 8, 12, 16, 24 units (p-4, m-8, gap-12, etc.) for harmonious spacing throughout.

### D. Component Library

**Navigation**:
- Sticky header with logo, component categories, search, and theme toggle
- Sidebar navigation for component filtering (categories, complexity, tags)

**Hero Section**:
- Full-viewport hero with gradient background
- Large heading emphasizing "Jetpack Compose UI Components"
- Android phone mockup displaying animated component previews
- Primary CTA button with blurred background when over hero image

**Component Cards**:
- Dark/light mode adaptive cards with subtle shadows
- Component preview in Android frame mockup
- Copy code button with toast feedback
- Tags for categories and difficulty level

**Code Display**:
- Syntax highlighted Kotlin code blocks
- One-click copy functionality
- Expandable/collapsible code sections

**Upload Interface**:
- Drag-and-drop zone for component uploads
- Form fields for component metadata (name, category, description)
- Live preview of uploaded components

### E. Animations
**Minimal & Purposeful**:
- Subtle hover effects on component cards (scale: 1.02)
- Smooth theme transitions
- Copy button success animations
- Component preview rotations in hero Android mockup

## Images
- **Hero**: Large Android phone mockup (center-right) displaying rotating component previews
- **Component Previews**: Android device frames showing live component demonstrations
- **Upload Zone**: Illustrated drag-and-drop area with Android/Kotlin iconography
- **No large hero image** - focus on the phone mockup and gradients for visual impact

## Key Sections (Landing Page)
1. **Hero**: Component showcase with Android mockup
2. **Popular Components**: Grid of trending components
3. **Categories**: Visual category browser
4. **Upload CTA**: Encourage community contributions
5. **Footer**: Links and social proof

**Critical Constraint**: Maximum 5 sections, focused on component discovery and upload functionality.