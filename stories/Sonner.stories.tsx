import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '@/components/ui/glass/sonner';
import { Button } from '@/components/ui/glass/button';
import { toast } from 'sonner';

const meta = {
  title: 'Glass UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Toast Notifications</h3>
      <p className="text-sm text-muted-foreground mb-4">
        All toasts automatically use glass effects with color-coded borders. Click the buttons below to see different toast types.
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => toast('Default Toast', {
            description: 'This is a default toast notification'
          })}
        >
          Default Toast
        </Button>

        <Button
          onClick={() => toast.success('Success!', {
            description: 'Your action was completed successfully'
          })}
        >
          Success Toast
        </Button>

        <Button
          onClick={() => toast.error('Error!', {
            description: 'Something went wrong. Please try again.'
          })}
        >
          Error Toast
        </Button>

        <Button
          onClick={() => toast.warning('Warning!', {
            description: 'Please review your information'
          })}
        >
          Warning Toast
        </Button>

        <Button
          onClick={() => toast.info('Information', {
            description: 'Here is some useful information'
          })}
        >
          Info Toast
        </Button>

        <Button
          onClick={() => toast.loading('Loading...', {
            description: 'Please wait while we process your request'
          })}
        >
          Loading Toast
        </Button>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Toast with Actions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Toasts can include action buttons
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => toast('Event created', {
            description: 'Your event has been scheduled',
            action: {
              label: 'View',
              onClick: () => console.log('View clicked'),
            },
          })}
        >
          With Action
        </Button>

        <Button
          onClick={() => toast('Are you sure?', {
            description: 'This action cannot be undone',
            action: {
              label: 'Confirm',
              onClick: () => toast.success('Confirmed!'),
            },
            cancel: {
              label: 'Cancel',
              onClick: () => toast.error('Cancelled'),
            },
          })}
        >
          With Cancel
        </Button>
      </div>
    </div>
  ),
};

export const WithDuration: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Custom Duration</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Control how long toasts are displayed
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => toast('Quick toast', {
            description: 'Disappears in 1 second',
            duration: 1000,
          })}
        >
          1 Second
        </Button>

        <Button
          onClick={() => toast('Normal toast', {
            description: 'Standard 4 second duration',
            duration: 4000,
          })}
        >
          4 Seconds
        </Button>

        <Button
          onClick={() => toast('Long toast', {
            description: 'Stays for 10 seconds',
            duration: 10000,
          })}
        >
          10 Seconds
        </Button>

        <Button
          onClick={() => toast('Permanent', {
            description: 'This toast will not auto-dismiss',
            duration: Infinity,
          })}
        >
          Never Dismiss
        </Button>
      </div>
    </div>
  ),
};

export const WithPromise: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Promise-based Toast</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Show loading, success, or error states automatically
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => {
            const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
            toast.promise(promise(), {
              loading: 'Uploading...',
              success: 'Upload complete!',
              error: 'Upload failed',
            });
          }}
        >
          Upload File
        </Button>

        <Button
          onClick={() => {
            const promise = () => new Promise((_, reject) => setTimeout(reject, 2000));
            toast.promise(promise(), {
              loading: 'Saving data...',
              success: 'Data saved!',
              error: 'Failed to save',
            });
          }}
        >
          Save (Fails)
        </Button>

        <Button
          onClick={() => {
            const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'John' }), 2000));
            toast.promise(promise(), {
              loading: 'Fetching user...',
              success: (data: any) => `Welcome, ${data.name}!`,
              error: 'Could not fetch user',
            });
          }}
        >
          Fetch User
        </Button>
      </div>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Toast Positions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Position toasts in different areas of the screen
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          size="sm"
          onClick={() => toast('Top Left', { position: 'top-left' })}
        >
          Top Left
        </Button>

        <Button
          size="sm"
          onClick={() => toast('Top Center', { position: 'top-center' })}
        >
          Top Center
        </Button>

        <Button
          size="sm"
          onClick={() => toast('Top Right', { position: 'top-right' })}
        >
          Top Right
        </Button>

        <Button
          size="sm"
          onClick={() => toast('Bottom Left', { position: 'bottom-left' })}
        >
          Bottom Left
        </Button>

        <Button
          size="sm"
          onClick={() => toast('Bottom Center', { position: 'bottom-center' })}
        >
          Bottom Center
        </Button>

        <Button
          size="sm"
          onClick={() => toast('Bottom Right', { position: 'bottom-right' })}
        >
          Bottom Right
        </Button>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Custom Glass Effects</h3>
      <p className="text-sm text-muted-foreground mb-4">
        All toasts use regular liquid glass by default. Pass a material class to change it.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Button
          material="clear"
          onClick={() => toast('Clear Glass Toast', {
            description: 'Barely frosted, the most see-through material',
            className: 'lg-clear',
          })}
        >
          Clear Glass
        </Button>

        <Button
          effect="glow"
          onClick={() => toast('Glowing Glass Toast', {
            description: 'Glass with a soft white rim glow',
            className: 'shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_-4px_rgba(255,255,255,0.45)]',
          })}
        >
          With Glow
        </Button>
      </div>

      <div className="mt-4 p-4 lg lg-regular lg-surface">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Toasts carry the liquid glass material
          automatically; a material class such as <code>lg-clear</code> swaps it.
        </p>
      </div>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Multiple Toasts</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Stack multiple notifications
      </p>
      
      <Button
        effect="shimmer"
        onClick={() => {
          toast.success('First notification');
          setTimeout(() => toast.info('Second notification'), 200);
          setTimeout(() => toast.warning('Third notification'), 400);
          setTimeout(() => toast.error('Fourth notification'), 600);
        }}
      >
        Show Multiple Toasts
      </Button>
    </div>
  ),
};

