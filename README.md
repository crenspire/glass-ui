# Glass UI

A modern, glassmorphic component library inspired by Apple's design language, built with Next.js 16, React 19, and shadcn-ui registry.

![Glass UI](https://img.shields.io/badge/Glass%20UI-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## ✨ Features

- **40+ Glass Components** - Comprehensive collection of beautiful, glassy UI components
- **Apple-Inspired Design** - Glassmorphism effects following Apple's design standards
- **Theme Support** - Built-in light/dark mode with automatic theme switching
- **Enhanced Effects** - Glow, shimmer, ripple, and gradient animations
- **Fully Customizable** - Per-component glass effect customization
- **Package Manager Support** - Install with pnpm, yarn, npm, or bun
- **TypeScript** - Fully typed components for better developer experience
- **Accessible** - Built on Radix UI primitives for accessibility
- **Tailwind CSS** - Utility-first styling with CSS variables

## 🚀 Quick Start

### Installation

Install components using the shadcn CLI with your preferred package manager:

**pnpm:**
```bash
pnpm dlx shadcn@latest add @glass-ui/button
```

**yarn:**
```bash
yarn dlx shadcn@latest add @glass-ui/button
```

**npm:**
```bash
npx shadcn@latest add @glass-ui/button
```

**bun:**
```bash
bunx shadcn@latest add @glass-ui/button
```

### Usage

After installation, import and use components in your project:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Example() {
  return (
    <div>
      <Button effect="glow">
        Click me
      </Button>
      <Card material="clear" gradient animated>
        <CardHeader>
          <CardTitle>Beautiful Card</CardTitle>
        </CardHeader>
        <CardContent>Your content here</CardContent>
      </Card>
    </div>
  )
}
```

> **Note:** The import path depends on your project's component directory configuration. By default, shadcn CLI installs components to `@/components/ui/`.

## 📚 Documentation

Visit the [full documentation](https://glass-ui.crenspire.com) for:
- Complete component reference
- Installation guides
- Customization examples
- Theme configuration
- Glass effect customization

## 🎨 Interactive Playground

Explore and test components interactively with Storybook:

```bash
# Start Storybook
pnpm storybook

# Build Storybook (static)
pnpm build-storybook
```

Storybook provides:
- ✨ Live component previews
- 🎛️ Interactive controls for all props
- 📖 Auto-generated documentation
- ♿ Accessibility testing
- 🌓 Theme switching
- 📱 Responsive viewport testing

Visit `http://localhost:6006` after starting Storybook.

## 🏗️ Architecture

Glass UI follows a two-layer component architecture:

### Base Components (`registry/ui/`)
Foundation components with the liquid glass material providing:
- Core functionality
- `material` (regular, clear, tinted), `tint` and `glass` props
- Accessibility features (Radix UI)
- TypeScript support

### Glass UI Components (`registry/ui/glass/`)
Enhanced components built on top of base components with:
- Enhanced visual effects (glow, shimmer, ripple)
- Advanced styling options
- Gradient and animation support
- Custom design patterns

## 🎨 Customization

### Materials

```tsx
<Card>Regular liquid glass (default)</Card>
<Card material="clear">Clear glass</Card>
<Button material="tinted" tint="#3b82f6">Tinted glass</Button>
<Card glass={{ tint: "rgba(139, 92, 246, 0.6)", frost: 0.5 }}>Custom tint and frost</Card>
```

### Global CSS Variables

```css
:root {
  --lg-rim-hi: rgba(255, 255, 255, 0.8);
  --lg-rim-lo: rgba(255, 255, 255, 0.18);
  --lg-highlight: rgba(255, 255, 255, 0.6);
  --lg-drop: rgba(15, 23, 42, 0.14);
}
.lg-regular { --lg-base: rgba(255, 255, 255, 0.42); --lg-blur: 16px; }
```

See [components/ui/glass/GLASS_CUSTOMIZATION.md](components/ui/glass/GLASS_CUSTOMIZATION.md) for the full reference.

### Liquid Glass (WebGL)

Wrap your app in `LiquidGlassProvider` and glass resting on the backdrop is drawn with real refraction,
dispersion and a light-tracking rim. Everything else keeps the CSS look, as does the whole app when WebGL is
unavailable or the user prefers reduced transparency. See [components/ui/liquid/README.md](components/ui/liquid/README.md).

## 📦 Available Components

### Form Components
- Button, Input, Textarea, Label
- Checkbox, Switch, Radio Group
- Select, Input OTP

### Display Components
- Card, Badge, Avatar, Alert
- Skeleton, Separator, Table

### Overlay Components
- Dialog, Alert Dialog, Popover
- Tooltip, Hover Card, Sheet
- Drawer, Sidebar

### Navigation Components
- Tabs, Accordion, Breadcrumb
- Dropdown Menu, Navigation Menu
- Pagination, Scroll Area

### Data Display
- Calendar, Chart, Command
- Slider, Toggle, Toggle Group

And more! See the [full component list](https://glass-ui.crenspire.com/components).

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm, yarn, npm, or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/crenspire/glass-ui.git
cd glass-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook (interactive playground)
pnpm storybook

# Build the project
pnpm build

# Build the registry
pnpm registry:build
```

### Project Structure

```
glass-ui/
├── app/                    # Next.js app directory
├── components/             # Shared components
├── lib/                    # Utilities and helpers
├── public/                 # Static assets
├── registry/
│   ├── ui/                # Base components
│   └── ui/glass/          # Glass UI components
├── stories/               # Storybook stories
└── registry.json          # Component registry
```

## 🚀 Deployment

### Deploy to Vercel

Deploy both the documentation site and Storybook to Vercel:

**Quick Start:**
1. Deploy main site: Import your repo at [vercel.com/new](https://vercel.com/new)
2. Deploy Storybook: Import the same repo again with these settings:
   - Build Command: `pnpm build-storybook`
   - Output Directory: `storybook-static`
3. Set environment variable `NEXT_PUBLIC_STORYBOOK_URL` in main site
4. Redeploy main site

**Detailed Instructions:**
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide
- See [DEPLOYMENT-QUICKSTART.md](./DEPLOYMENT-QUICKSTART.md) for quick reference

### Build Commands

```bash
# Build main site
pnpm build

# Build Storybook
pnpm build-storybook

# Test builds locally
pnpm start  # Serves main site on http://localhost:3000
npx http-server storybook-static  # Serves Storybook on http://localhost:8080
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Documentation](https://glass-ui.crenspire.com)
- [GitHub Repository](https://github.com/crenspire/glass-ui)
- [Issue Tracker](https://github.com/crenspire/glass-ui/issues)

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com)
- Powered by [Radix UI](https://www.radix-ui.com)
- Inspired by Apple's design language

---

Made with ❤️ by [Crenspire Technologies](https://crenspire.com)
