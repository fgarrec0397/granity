import { ComponentMeta, ComponentStory } from "@storybook/react";

import Modal from "./Modal";

export default {
    title: "Atoms/Modal",
    component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    children: () => "Modal !",
};
