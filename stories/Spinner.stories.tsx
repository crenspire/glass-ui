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
    variant: {
      control: 'select',
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    variant: 'glass',
    size: 'md',
  },
};

export const Frosted: Story = {
  args: {
    variant: 'frosted',
    size: 'md',
  },
};

export const Fluted: Story = {
  args: {
    variant: 'fluted',
    size: 'md',
  },
};

export const Crystal: Story = {
  args: {
    variant: 'crystal',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    variant: 'glass',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    variant: 'glass',
    size: 'lg',
  },
};

