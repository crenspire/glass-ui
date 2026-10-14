import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/glass/input';
import { Search, Mail } from 'lucide-react';

const meta = {
  title: 'Glass UI/Input',
  component: Input,
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
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Frosted: Story = {
  args: {
    placeholder: 'Frosted input...',
  },
};

export const Crystal: Story = {
  args: {
    placeholder: 'Crystal input...',
    material: 'clear',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: <Search className="h-4 w-4" />,
  },
};

export const WithEmailIcon: Story = {
  args: {
    placeholder: 'Email address...',
    icon: <Mail className="h-4 w-4" />,
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

