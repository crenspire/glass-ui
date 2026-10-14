import type { Meta, StoryObj } from '@storybook/react';
import { MenuBar, MenuBarItem } from '@/components/ui/glass/menu-bar';

const meta = {
  title: 'Glass UI/MenuBar',
  component: MenuBar,
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
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuBarItem active>File</MenuBarItem>
        <MenuBarItem>Edit</MenuBarItem>
        <MenuBarItem>View</MenuBarItem>
        <MenuBarItem>Help</MenuBarItem>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    children: (
      <>
        <MenuBarItem active>File</MenuBarItem>
        <MenuBarItem>Edit</MenuBarItem>
        <MenuBarItem>View</MenuBarItem>
        <MenuBarItem>Help</MenuBarItem>
      </>
    ),
  },
};

