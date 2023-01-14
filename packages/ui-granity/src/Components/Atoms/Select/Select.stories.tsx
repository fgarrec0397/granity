import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select from './Select';

export default {
  title: 'Atoms/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  label: "Select",
  options: [
    { value: "value1" },
    { value: "value2" },
    { value: "value3" },
  ]
};
