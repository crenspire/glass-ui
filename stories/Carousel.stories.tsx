import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@/components/ui/glass/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/glass/card';

const meta = {
  title: 'Glass UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal'],
    },
    autoPlay: {
      control: 'boolean',
    },
    interval: {
      control: 'number',
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'glass',
    autoPlay: false,
    className: 'w-[400px] h-[200px]',
    children: (
      <>
        <Card variant="glass" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 1</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 1</CardContent>
        </Card>
        <Card variant="glass" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 2</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 2</CardContent>
        </Card>
        <Card variant="glass" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 3</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 3</CardContent>
        </Card>
      </>
    ),
  },
};

export const AutoPlay: Story = {
  args: {
    variant: 'glass',
    autoPlay: true,
    interval: 3000,
    className: 'w-[400px] h-[200px]',
    children: (
      <>
        <Card variant="glass" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 1</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 1</CardContent>
        </Card>
        <Card variant="glass" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 2</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 2</CardContent>
        </Card>
        <Card variant="glass" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 3</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 3</CardContent>
        </Card>
      </>
    ),
  },
};

export const Frosted: Story = {
  args: {
    variant: 'frosted',
    autoPlay: false,
    className: 'w-[400px] h-[200px]',
    children: (
      <>
        <Card variant="frosted" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 1</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 1</CardContent>
        </Card>
        <Card variant="frosted" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 2</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 2</CardContent>
        </Card>
        <Card variant="frosted" className="h-full m-2">
          <CardHeader>
            <CardTitle>Slide 3</CardTitle>
          </CardHeader>
          <CardContent>Content for slide 3</CardContent>
        </Card>
      </>
    ),
  },
};

