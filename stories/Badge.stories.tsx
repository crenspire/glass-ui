import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/glass/badge';

const meta = {
  title: 'Glass UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['liquid', 'default', 'secondary', 'destructive', 'outline'],
    },
    material: {
      control: 'select',
      options: ['regular', 'clear', 'tinted'],
    },
    glow: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    children: 'Glass Badge',
  },
};

export const Frosted: Story = {
  args: {
    children: 'Frosted',
  },
};

export const Crystal: Story = {
  args: {
    children: 'Crystal',
    material: 'clear',
  },
};

export const WithGlow: Story = {
  args: {
    children: 'Glowing Badge',
    glow: true,
  },
};

