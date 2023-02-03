import { ComponentMeta, ComponentStory } from "@storybook/react";

import TextField from "./TextField";

export default {
    title: "Atoms/TextField",
    component: TextField,
} as ComponentMeta<typeof TextField>;

const TextFieldTemplate: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

//👇 Each story then reuses that template
export const TextFieldDefault = TextFieldTemplate.bind({});

TextFieldDefault.args = {
    defaultValue: "Small",
    variant: "filled",
};
