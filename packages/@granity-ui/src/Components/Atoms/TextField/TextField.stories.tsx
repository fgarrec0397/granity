import { ComponentMeta, ComponentStory } from "@storybook/react";

import TextField from "./TextField";

export default {
    title: "Atoms/TextField",
    component: TextField,
} as ComponentMeta<typeof TextField>;

const TextFieldTemplate: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const TextFieldDefault: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="Default" />
);

export const TextFieldDefaultDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="Default Disabled" disabled />
);

export const TextFieldSmall: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="Small" size="small" />
);

export const TextFieldSmallDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="Small" size="small" disabled />
);

export const TextFieldNumber: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="10" type="number" />
);

export const TextFieldNumberDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="10" type="number" disabled />
);

export const TextFieldNumberSmall: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="10" size="small" type="number" />
);

export const TextFieldNumberSmallDisabled: ComponentStory<typeof TextField> = () => (
    <TextFieldTemplate defaultValue="10" size="small" type="number" disabled />
);

export const TextFieldSelect: ComponentStory<typeof TextField> = () => {
    return (
        <TextFieldTemplate
            select
            label="Select"
            defaultValue="option1"
            helperText="Please select your option"
        >
            <option value="option1">Option1</option>
            <option value="option2">Option2</option>
            <option value="option3">Option3</option>
        </TextFieldTemplate>
    );
};

// export const TextFieldSelectDisabled: ComponentStory<typeof TextField> = () => (
//     <TextFieldTemplate
//         id="outlined-select-option"
//         select
//         defaultValue="option1"
//         helperText="Please select your option"
//         disabled
//     >
//         {[
//             { value: "option1", label: "Option 1" },
//             { value: "option2", label: "Option 2" },
//             { value: "option3", label: "Option 3" },
//         ].map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//             </MenuItem>
//         ))}
//     </TextFieldTemplate>
// );
