# Glass UI Components

This folder contains the main designed components for Glass UI. These components are built on top of the base components located in `../` (parent directory).

## Architecture

- **Base Components** (`../`): Foundation components with the liquid glass material (`material`, `tint`, `glass` props)
- **Glass UI Components** (`./glass/`): Designed components that use base components with enhanced styling

## Usage

```tsx
import { Button, Card, Input, CardHeader, CardTitle } from "@/components/ui/glass"

// Liquid glass by default; pick a material per component
<Button effect="glow">Click me</Button>
<Button material="tinted">Continue</Button>

<Card gradient animated>
  <CardHeader>
    <CardTitle>Beautiful Card</CardTitle>
  </CardHeader>
</Card>
```

See [GLASS_CUSTOMIZATION.md](./GLASS_CUSTOMIZATION.md) for materials, roles and CSS variables, and
[../liquid/README.md](../liquid/README.md) for WebGL refraction.

## Component Pattern

All Glass UI components:
1. Import base components from parent directory
2. Add enhanced styling and effects
3. Maintain the same API as base components
4. Add additional props for design customization

## Available Components

- `Button` - Enhanced button with glow, shimmer, and ripple effects
- `Card` - Card with gradient and animation options
- `Input` - Input with icon support and error states

More components coming soon...

