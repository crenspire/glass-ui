import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'Glass UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border glass-bg backdrop-blur-[var(--blur)] border-[var(--glass-border)]">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm" key={tag}>
              {tag}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border glass-bg backdrop-blur-[var(--blur)] border-[var(--glass-border)]">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <figure key={i} className="shrink-0">
            <div className="overflow-hidden rounded-md w-[150px] h-[150px] glass-bg backdrop-blur-[var(--blur-sm)]">
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                Image {i + 1}
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithContent: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[350px] rounded-md border glass-bg backdrop-blur-[var(--blur)] border-[var(--glass-border)] p-4">
      <h4 className="mb-4 text-sm font-medium leading-none">Glass UI Documentation</h4>
      <div className="space-y-4 text-sm">
        <p>
          Glass UI is a modern, glassmorphic component library inspired by Apple's design language,
          built with Next.js 16, React 19, and shadcn-ui registry.
        </p>
        <p>
          It provides 40+ beautiful glass components with variants including glass, frosted, fluted,
          and crystal effects.
        </p>
        <Separator className="my-4" />
        <h5 className="font-medium">Features</h5>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Apple-inspired glassmorphism design</li>
          <li>Built-in light/dark mode support</li>
          <li>Enhanced effects (glow, ripple, lift, scale)</li>
          <li>Fully customizable per-component</li>
          <li>TypeScript support</li>
          <li>Accessible (Radix UI primitives)</li>
          <li>Tailwind CSS based</li>
        </ul>
        <Separator className="my-4" />
        <h5 className="font-medium">Glass Variants</h5>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Glass - Base glass effect with balanced blur</li>
          <li>Frosted - Strong blur for enhanced depth</li>
          <li>Fluted - Textured pattern overlay</li>
          <li>Crystal - Layered effects with animations</li>
        </ul>
      </div>
    </ScrollArea>
  ),
};

