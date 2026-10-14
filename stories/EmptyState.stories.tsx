import type { Meta, StoryObj } from '@storybook/react';
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from '@/components/ui/glass/empty-state';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/glass/button';

const meta = {
  title: 'Glass UI/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['liquid', 'default'],
    },
    material: {
      control: 'select',
      options: ['regular', 'clear', 'tinted'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'shimmer', 'ripple', 'lift', 'scale'],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <EmptyStateIcon>
          <Inbox className="h-12 w-12" />
        </EmptyStateIcon>
        <EmptyStateTitle>No items found</EmptyStateTitle>
        <EmptyStateDescription>
          Get started by creating a new item.
        </EmptyStateDescription>
        <Button className="mt-4">
          Create Item
        </Button>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    children: (
      <>
        <EmptyStateIcon>
          <Inbox className="h-12 w-12" />
        </EmptyStateIcon>
        <EmptyStateTitle>No items found</EmptyStateTitle>
        <EmptyStateDescription>
          Get started by creating a new item.
        </EmptyStateDescription>
        <Button className="mt-4">
          Create Item
        </Button>
      </>
    ),
  },
};

