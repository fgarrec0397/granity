import { ComponentMeta, ComponentStory } from "@storybook/react";

import Collapse from "./Collapse";

export default {
    title: "Atoms/Collapse",
    component: Collapse,
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => <Collapse {...args} />;

export const Basic = Template.bind({});
export const Wrapped = Template.bind({});

Basic.args = {
    title: "Collapse",
    children: "Collapsable content!",
};

Wrapped.args = {
    title: "Collapse",
    children: "Content!",
};

Wrapped.decorators = [
    (Story) => (
        <div style={{ maxWidth: "250px" }}>
            <Story />
        </div>
    ),
];
