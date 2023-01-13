import { ComponentStory, ComponentMeta } from '@storybook/react';

import Collapse from '../Collapse/Collapse';

export default {
  title: 'Atoms/Collapse',
  component: Collapse,
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => <Collapse {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: "Collapse",
  children: "Collapsable content!"
};