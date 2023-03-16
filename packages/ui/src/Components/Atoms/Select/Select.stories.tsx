import { ComponentMeta, ComponentStory } from "@storybook/react";

import MenuItem from "../MenuItem/MenuItem";
import Select from "./Select";

export default {
    title: "Atoms/Select",
    component: Select,
} as ComponentMeta<typeof Select>;

const SelectTemplate: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectSelect: ComponentStory<typeof Select> = () => {
    return (
        <SelectTemplate label="Select" defaultValue="option1" fullWidth>
            <MenuItem value="option1">Option1</MenuItem>
            <MenuItem value="option2">Option2</MenuItem>
            <MenuItem value="option3">Option3</MenuItem>
        </SelectTemplate>
    );
};
