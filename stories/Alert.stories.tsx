import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Terminal, CheckCircle2, XCircle } from 'lucide-react';

const meta = {
  title: 'Glass UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['liquid', 'default', 'destructive'],
    },
    material: {
      control: 'select',
      options: ['regular', 'clear', 'tinted'],
    },
    hover: {
      control: 'select',
      options: ['none', 'glow', 'shimmer', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    children: (
      <>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    children: (
      <>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is a frosted glass alert with enhanced blur effect.
        </AlertDescription>
      </>
    ),
  },
};

export const Crystal: Story = {
  args: {
    material: 'clear',
    children: (
      <>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          This alert doesn't have an icon, just text content.
        </AlertDescription>
      </>
    ),
  },
};

export const WithGlowHover: Story = {
  args: {
    hover: 'glow',
    children: (
      <>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Glow Hover Effect</AlertTitle>
        <AlertDescription>
          Hover over this alert to see the glow effect.
        </AlertDescription>
      </>
    ),
  },
};

export const WithShimmerHover: Story = {
  args: {
    hover: 'shimmer',
    children: (
      <>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Shimmer Effect</AlertTitle>
        <AlertDescription>
          Hover to see a beautiful shimmer animation sweep across.
        </AlertDescription>
      </>
    ),
  },
};

export const WithLiftHover: Story = {
  args: {
    material: 'clear',
    hover: 'lift',
    children: (
      <>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Lift Effect</AlertTitle>
        <AlertDescription>
          This alert lifts up slightly when you hover over it.
        </AlertDescription>
      </>
    ),
  },
};

export const WithScaleHover: Story = {
  args: {
    hover: 'scale',
    children: (
      <>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Scale Effect</AlertTitle>
        <AlertDescription>
          Hover to see this alert scale up slightly.
        </AlertDescription>
      </>
    ),
  },
};

