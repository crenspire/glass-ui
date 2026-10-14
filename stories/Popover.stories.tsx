import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/glass/button';
import { Input } from '@/components/ui/glass/input';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'Glass UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Frosted: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Frosted Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Frosted Glass</h4>
            <p className="text-sm text-muted-foreground">
              This popover uses a frosted glass effect with enhanced blur.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Crystal: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button material="clear">Crystal Popover</Button>
      </PopoverTrigger>
      <PopoverContent material="clear" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Crystal Glass</h4>
            <p className="text-sm text-muted-foreground">
              Premium crystal glass effect with layered styling.
            </p>
          </div>
          <div className="flex gap-2">
            <Button material="clear" size="sm">Action</Button>
            <Button variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SimpleText: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Hover Info</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">
          This is a simple popover with just text content.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
