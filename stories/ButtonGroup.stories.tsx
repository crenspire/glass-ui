import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '@/components/ui/glass/button-group';
import { Button } from '@/components/ui/glass/button';

const meta = {
  title: 'Glass UI/ButtonGroup',
  component: ButtonGroup,
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'shimmer', 'ripple', 'lift', 'scale'],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <>
        <Button variant="ghost">One</Button>
        <Button variant="ghost">Two</Button>
        <Button variant="ghost">Three</Button>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    children: (
      <>
        <Button variant="ghost">One</Button>
        <Button variant="ghost">Two</Button>
        <Button variant="ghost">Three</Button>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <>
        <Button variant="ghost">One</Button>
        <Button variant="ghost">Two</Button>
        <Button variant="ghost">Three</Button>
      </>
    ),
  },
};

