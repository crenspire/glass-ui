import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/components/ui/glass/spinner';

const meta = {
  title: 'Glass UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'shimmer', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    size: 'md',
  },
};

export const Frosted: Story = {
  args: {
    size: 'md',
  },
};

export const Fluted: Story = {
  args: {
    material: 'clear',
    size: 'md',
  },
};

export const Crystal: Story = {
  args: {
    material: 'clear',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

