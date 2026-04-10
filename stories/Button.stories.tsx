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
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    children: 'Glass Button',
    variant: 'glass',
    effect: 'glow',
  },
};

export const Frosted: Story = {
  args: {
    children: 'Frosted Button',
    variant: 'frosted',
    effect: 'glow',
  },
};

export const Fluted: Story = {
  args: {
    children: 'Fluted Button',
    variant: 'fluted',
    effect: 'glow',
  },
};

export const Crystal: Story = {
  args: {
    children: 'Crystal Button',
    variant: 'crystal',
    effect: 'glow',
  },
};

export const WithRipple: Story = {
  args: {
    children: 'Ripple Effect',
    variant: 'glass',
    effect: 'ripple',
  },
};

export const WithLift: Story = {
  args: {
    children: 'Lift Effect',
    variant: 'glass',
    effect: 'lift',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'glass',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'glass',
    size: 'lg',
  },
};

