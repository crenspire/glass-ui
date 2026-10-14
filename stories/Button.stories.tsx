import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/glass/button';

const meta = {
  title: 'Glass UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['liquid', 'default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    material: {
      control: 'select',
      options: ['regular', 'clear', 'tinted'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'shimmer', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    children: 'Glass Button',
    effect: 'glow',
  },
};

export const Frosted: Story = {
  args: {
    children: 'Frosted Button',
    effect: 'glow',
  },
};

export const Fluted: Story = {
  args: {
    children: 'Fluted Button',
    material: 'clear',
    effect: 'glow',
  },
};

export const Crystal: Story = {
  args: {
    children: 'Crystal Button',
    material: 'clear',
    effect: 'glow',
  },
};

export const WithShimmer: Story = {
  args: {
    children: 'Shimmer Effect',
    effect: 'shimmer',
  },
};

export const WithRipple: Story = {
  args: {
    children: 'Ripple Effect',
    effect: 'ripple',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

