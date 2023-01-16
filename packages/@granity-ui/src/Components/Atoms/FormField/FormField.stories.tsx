import { ComponentMeta, ComponentStory } from "@storybook/react";

import FormField from "./FormField";

export default {
    title: "Atoms/FormField",
    component: FormField,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: "250px" }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => <FormField {...args} />;

export const InputText = Template.bind({});
export const InputNumber = Template.bind({});

InputText.args = {
    label: "Input Text",
};

InputNumber.args = {
    label: "Input Number",
    inputProps: {
        type: "number",
        name: "number",
    },
};
