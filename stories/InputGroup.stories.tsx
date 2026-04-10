import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from '@/components/ui/glass/input-group';
import { Input } from '@/components/ui/glass/input';
import { Button } from '@/components/ui/glass/button';
import { Search } from 'lucide-react';

const meta = {
  title: 'Glass UI/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithButton: Story = {
  args: {
    variant: 'glass',
    children: (
      <>
        <Input placeholder="Search..." className="border-0 rounded-r-none" />
        <Button variant="ghost" size="icon" className="rounded-l-none">
          <Search className="h-4 w-4" />
        </Button>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    variant: 'frosted',
    children: (
      <>
        <Input placeholder="Search..." className="border-0 rounded-r-none" />
        <Button variant="ghost" size="icon" className="rounded-l-none">
          <Search className="h-4 w-4" />
        </Button>
      </>
    ),
  },
};

