import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from '@/components/ui/glass/context-menu';
import { Card, CardContent } from '@/components/ui/glass/card';

const meta = {
  title: 'Glass UI/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-8 cursor-pointer">
          <CardContent>Right click me</CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>My Account</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Frosted: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-8 cursor-pointer">
          <CardContent>Right click me</CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>My Account</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

