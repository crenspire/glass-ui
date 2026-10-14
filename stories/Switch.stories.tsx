import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'Glass UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'switch-default',
  },
  render: (args) => (
    <>
      <Switch {...args} />
      <Label htmlFor="switch-default">Airplane Mode</Label>
    </>
  ),
};

export const Checked: Story = {
  args: {
    id: 'switch-checked',
    defaultChecked: true,
  },
  render: (args) => (
    <>
      <Switch {...args} />
      <Label htmlFor="switch-checked">Notifications enabled</Label>
    </>
  ),
};

export const Disabled: Story = {
  args: {
    id: 'switch-disabled',
    disabled: true,
  },
  render: (args) => (
    <>
      <Switch {...args} />
      <Label htmlFor="switch-disabled">Disabled switch</Label>
    </>
  ),
};

export const DisabledChecked: Story = {
  args: {
    id: 'switch-disabled-checked',
    disabled: true,
    defaultChecked: true,
  },
  render: (args) => (
    <>
      <Switch {...args} />
      <Label htmlFor="switch-disabled-checked">Always on</Label>
    </>
  ),
};

