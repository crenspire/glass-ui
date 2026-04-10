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
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal', 'destructive'],
    },
    hover: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
      description: 'Hover animation effect',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    variant: 'glass',
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
    variant: 'frosted',
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
    variant: 'crystal',
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
    variant: 'glass',
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
    variant: 'glass',
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

export const WithRippleHover: Story = {
  args: {
    variant: 'frosted',
    hover: 'ripple',
    children: (
      <>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ripple Effect</AlertTitle>
        <AlertDescription>
          Hover to see a beautiful ripple animation.
        </AlertDescription>
      </>
    ),
  },
};

export const WithLiftHover: Story = {
  args: {
    variant: 'crystal',
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
    variant: 'glass',
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

