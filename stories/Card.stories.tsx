import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/glass/card';

const meta = {
  title: 'Glass UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal'],
    },
    hover: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>A beautiful glass morphism card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content with glass effect.</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Card footer</p>
        </CardFooter>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    variant: 'frosted',
    children: (
      <>
        <CardHeader>
          <CardTitle>Frosted Card</CardTitle>
          <CardDescription>A frosted glass effect card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a stronger blur and frosted appearance.</p>
        </CardContent>
      </>
    ),
  },
};

export const Fluted: Story = {
  args: {
    variant: 'fluted',
    children: (
      <>
        <CardHeader>
          <CardTitle>Fluted Card</CardTitle>
          <CardDescription>A textured glass effect card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card features a unique fluted texture pattern.</p>
        </CardContent>
      </>
    ),
  },
};

export const Crystal: Story = {
  args: {
    variant: 'crystal',
    children: (
      <>
        <CardHeader>
          <CardTitle>Crystal Card</CardTitle>
          <CardDescription>A crystal clear glass effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has layered effects with animations and gradients.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithGlowHover: Story = {
  args: {
    variant: 'glass',
    hover: 'glow',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glow Hover Effect</CardTitle>
          <CardDescription>Hover to see the glow effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card glows when you hover over it.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithRippleHover: Story = {
  args: {
    variant: 'glass',
    hover: 'ripple',
    children: (
      <>
        <CardHeader>
          <CardTitle>Ripple Hover Effect</CardTitle>
          <CardDescription>Hover to see the ripple effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a ripple animation on hover.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithLiftHover: Story = {
  args: {
    variant: 'glass',
    hover: 'lift',
    children: (
      <>
        <CardHeader>
          <CardTitle>Lift Hover Effect</CardTitle>
          <CardDescription>Hover to see the lift effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card lifts up slightly when you hover over it.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithCustomGlass: Story = {
  args: {
    variant: 'glass',
    hover: 'scale',
    glass: {
      color: 'rgba(139, 92, 246, 0.15)',
      blur: 25,
      outline: 'rgba(139, 92, 246, 0.4)',
      innerGlow: 'rgba(255, 255, 255, 0.2)',
      innerGlowBlur: 20,
    },
    children: (
      <>
        <CardHeader>
          <CardTitle>Custom Glass + Scale Hover</CardTitle>
          <CardDescription>Fully customized glass properties with hover</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card uses custom glass properties and scales on hover.</p>
        </CardContent>
      </>
    ),
  },
};
