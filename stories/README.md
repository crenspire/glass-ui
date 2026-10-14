# Glass UI Storybook

Welcome to the Glass UI Storybook! This is your interactive component playground where you can explore, test, and customize all Glass UI components.

## 🚀 Getting Started

Run Storybook locally:

```bash
pnpm storybook
```

Storybook will start on `http://localhost:6006`

## 📚 What's Included

### Components with Stories (27 Total)

#### Form Components (8)
- **Button** - All variants with effects (glow, shimmer, ripple)
- **Input** - Form inputs with glass effects and icon support
- **Textarea** - Multi-line text inputs with glass variants
- **Checkbox** - Checkboxes with various states
- **Switch** - Toggle switches with states
- **RadioGroup** - Radio button groups
- **Label** - Form labels
- **Select** - Dropdown selects with glass variants

#### Display Components (6)
- **Card** - Glass morphism cards with customizable properties
- **Badge** - Small labels with glass styling
- **Alert** - Alert messages with icons and variants
- **Avatar** - User avatars with fallbacks and groups
- **Skeleton** - Loading skeletons
- **Separator** - Horizontal and vertical separators

#### Overlay Components (5)
- **Dialog** - Modal dialogs with glass effects
- **AlertDialog** - Confirmation dialogs
- **Popover** - Contextual popovers
- **Sheet** - Side sheets from all directions
- **HoverCard** - Rich hover cards

#### Navigation Components (2)
- **Tabs** - Tabbed interfaces with glass styling
- **Accordion** - Collapsible accordions

#### Data Components (4)
- **Table** - Data tables with glass variants
- **Command** - Command palettes with search
- **Slider** - Range sliders
- **ToggleGroup** (via Toggle) - Toggle button groups

#### Utility Components (4)
- **Tooltip** - Contextual tooltips
- **HoverCard** - Rich hover cards
- **ScrollArea** - Custom scroll areas
- **Toggle** - Toggle buttons

### Features

- ✨ **Live Preview** - See components in real-time
- 🎨 **Interactive Controls** - Adjust props and see changes instantly
- 📖 **Auto Documentation** - Component props and usage examples
- ♿ **Accessibility Testing** - Built-in a11y checks
- 🌓 **Theme Support** - Test in light and dark modes
- 📱 **Responsive** - Test different viewport sizes

## 🎨 Glass Materials

All glass components take a `material` prop:

- **regular** (default) - Frosted liquid glass
- **clear** - Barely frosted, the most see-through
- **tinted** - Washed with a colour (`tint`, the primary colour by default)

## 🛠️ Custom Glass Properties

Any glass component accepts a `glass` prop to override its tint and frost:

```tsx
glass={{ tint: "rgba(139, 92, 246, 0.6)", frost: 0.5 }}
```

## 📝 Adding New Stories

To add a new story, create a file in this directory:

```tsx
// stories/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@/components/ui/glass/component-name';

const meta = {
  title: 'Glass UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your props here
  },
};
```

## 🔗 Useful Links

- [Storybook Documentation](https://storybook.js.org/)
- [Glass UI Documentation](http://localhost:3000/docs)
- [Component API Reference](http://localhost:3000/docs/components)

## 🎯 Best Practices

1. **Use Backgrounds** - Test components on different backgrounds using the toolbar
2. **Test Materials** - Try regular, clear and tinted glass to find the perfect look
3. **Check Accessibility** - Use the a11y addon to ensure components are accessible
4. **Responsive Testing** - Check components on different screen sizes
5. **Interactive States** - Test hover, focus, and disabled states

## 📦 Building Storybook

To build a static version of Storybook:

```bash
pnpm build-storybook
```

The build output will be in `storybook-static/` directory.

## 💡 Tips

- Use **Controls** tab to adjust component props
- Use **Actions** tab to see event handlers
- Use **Docs** tab for component documentation
- Press `D` to toggle dark mode
- Press `F` to focus on a component
- Press `S` to add shortcuts panel

Enjoy exploring Glass UI components! 🎨✨

