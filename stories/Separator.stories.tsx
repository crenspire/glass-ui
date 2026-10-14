import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'Glass UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div>
        <h4 className="text-sm font-medium">Glass UI Components</h4>
        <p className="text-sm text-muted-foreground">
          Beautiful glassmorphic components.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Modern Design</h4>
        <p className="text-sm text-muted-foreground">
          Apple-inspired design language.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[350px] lg lg-regular lg-surface p-6 space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">radix-ui/primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Documentation</div>
        <Separator orientation="vertical" />
        <div>API Reference</div>
        <Separator orientation="vertical" />
        <div>Examples</div>
      </div>
    </div>
  ),
};

