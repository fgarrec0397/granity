import { ComponentMeta, ComponentStory } from "@storybook/react";

import TextField from "./TextField";

export default {
    title: "Atoms/TextField",
    component: TextField,
} as ComponentMeta<typeof TextField>;

const TextFieldTemplate: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const TextFieldDefault: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Default" />
);

export const TextFieldDefaultDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Default Disabled" disabled />
);

export const TextFieldSmall: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Small" size="small" />
);

export const TextFieldSmallDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Small" size="small" disabled />
);

export const TextFieldNumber: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Number" type="number" />
);

export const TextFieldNumberDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Number Disabled" type="number" disabled />
);

export const TextFieldNumberSmall: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate label="Number Small" size="small" type="number" />
);

export const TextFieldNumberSmallDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="Number Small Disabled" size="small" type="number" disabled />
);
