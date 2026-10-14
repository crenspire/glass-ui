import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/glass/button';

const meta = {
  title: 'Glass UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Frosted: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Show Frosted Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your action</AlertDialogTitle>
          <AlertDialogDescription>
            This dialog uses a frosted glass effect. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes, continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Crystal: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button material="clear">Show Crystal Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent material="clear">
        <AlertDialogHeader>
          <AlertDialogTitle>Premium Action</AlertDialogTitle>
          <AlertDialogDescription>
            This crystal glass dialog provides a premium feel with layered effects and animations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go back</AlertDialogCancel>
          <AlertDialogAction>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Everything</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">Warning: Destructive Action</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete all your data. This action is permanent and cannot be reversed.
            Please type "DELETE" to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground">
            Delete Everything
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

