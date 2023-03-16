import { FormControlLabel, FormGroup } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Checkbox from "./Checkbox";

export default {
    title: "Atoms/Checkbox",
    component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const CheckboxTemplate: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const CheckboxDefault: ComponentStory<typeof Checkbox> = () => <CheckboxTemplate />;
export const CheckboxDefaultDisabled: ComponentStory<typeof Checkbox> = () => (
    <CheckboxTemplate disabled />
);
export const CheckboxWithLabel: ComponentStory<typeof Checkbox> = () => {
    return (
        <FormGroup>
            <FormControlLabel control={<CheckboxTemplate defaultChecked />} label="Checkbox 1" />
            <FormControlLabel control={<CheckboxTemplate />} label="Checkbox 2" />
        </FormGroup>
    );
};
