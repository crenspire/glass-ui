import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerInput } from '@/components/ui/glass/date-picker-input';
import * as React from 'react';

const meta = {
  title: 'Glass UI/DatePickerInput',
  component: DatePickerInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'glassSubtle', 'frosted', 'fluted', 'crystal'],
    },
    effect: {
      control: 'select',
      options: ['none', 'glow', 'ripple', 'lift', 'scale'],
    },
  },
} satisfies Meta<typeof DatePickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return <DatePickerInput {...args} value={date} onChange={setDate} />;
  },
  args: {
    variant: 'glass',
    placeholder: 'Pick a date',
  },
};

export const Frosted: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return <DatePickerInput {...args} value={date} onChange={setDate} />;
  },
  args: {
    variant: 'frosted',
    placeholder: 'Pick a date',
  },
};

