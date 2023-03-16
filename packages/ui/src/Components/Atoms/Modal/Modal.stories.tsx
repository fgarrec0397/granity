import { ComponentMeta, ComponentStory } from "@storybook/react";

import Modal from "./Modal";

export default {
    title: "Atoms/Modal",
    component: Modal,
} as ComponentMeta<typeof Modal>;

const ModalTemplate: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const PrimaryDefault: ComponentStory<typeof Modal> = () => (
    <ModalTemplate>Primary Modal</ModalTemplate>
);
