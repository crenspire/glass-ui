import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/glass/dialog';
import { Button } from '@/components/ui/glass/button';
import { Input } from '@/components/ui/glass/input';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'Glass UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Frosted: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Frosted Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Frosted Glass Dialog</DialogTitle>
          <DialogDescription>
            This dialog uses a frosted glass effect with enhanced blur.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            The frosted variant provides a stronger blur effect, creating a more pronounced separation from the background.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Crystal: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button material="clear">Open Crystal Dialog</Button>
      </DialogTrigger>
      <DialogContent material="clear">
        <DialogHeader>
          <DialogTitle>Crystal Glass Dialog</DialogTitle>
          <DialogDescription>
            This dialog features layered crystal effects with animations.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            The crystal variant combines multiple layers with gradients and subtle animations for a premium look.
          </p>
        </div>
        <DialogFooter>
          <Button material="clear">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>
            Enter your information to create a new account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" />
          </div>
        </div>
        <DialogFooter>
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
