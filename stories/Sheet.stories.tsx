import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/glass/button';
import { Input } from '@/components/ui/glass/input';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'Glass UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GlassRight: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet (Right)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
        </div>
        <Button className="w-full">Save changes</Button>
      </SheetContent>
    </Sheet>
  ),
};

export const FrostedLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet (Left)</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Frosted Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the left with a frosted glass effect.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            The frosted variant provides enhanced blur and opacity for better content separation.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const CrystalTop: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button material="clear">Open Sheet (Top)</Button>
      </SheetTrigger>
      <SheetContent material="clear" side="top">
        <SheetHeader>
          <SheetTitle>Crystal Sheet</SheetTitle>
          <SheetDescription>
            Premium crystal glass sheet sliding from the top.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm">
            Crystal variant features layered effects with gradients and animations.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const GlassBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet (Bottom)</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides up from the bottom.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Perfect for mobile-friendly interactions and quick actions.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

