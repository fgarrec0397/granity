import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "./Button2";

export default {
    title: "Atoms/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryDefault: ComponentStory<typeof Button> = () => (
    <ButtonTemplate>Primary Button</ButtonTemplate>
);

export const PrimaryDefaultDisabled: ComponentStory<typeof Button> = () => (
    <ButtonTemplate disabled>Primary Disabled</ButtonTemplate>
);

export const PrimaryOutlined: ComponentStory<typeof Button> = () => (
    <ButtonTemplate variant="outlined">Primary Outlined</ButtonTemplate>
);

export const PrimaryOutlinedDisabled: ComponentStory<typeof Button> = () => (
    <ButtonTemplate variant="outlined" disabled>
        Primary Outlined Disabled
    </ButtonTemplate>
);

export const PrimaryText: ComponentStory<typeof Button> = () => (
    <ButtonTemplate variant="text">Primary Text</ButtonTemplate>
);

export const PrimaryTextDisabled: ComponentStory<typeof Button> = () => (
    <ButtonTemplate variant="text" disabled>
        Primary Text Disabled
    </ButtonTemplate>
);

export const SecondaryDefault: ComponentStory<typeof Button> = () => (
    <ButtonTemplate color="secondary">Secondary Button</ButtonTemplate>
);

export const SecondaryDefaultDisabled: ComponentStory<typeof Button> = () => (
    <ButtonTemplate color="secondary" disabled>
        Secondary Disabled
    </ButtonTemplate>
);

export const SecondaryOutlined: ComponentStory<typeof Button> = () => (
    <ButtonTemplate color="secondary" variant="outlined">
        Secondary Outlined
    </ButtonTemplate>
);

export const SecondaryOutlinedDisabled: ComponentStory<typeof Button> = () => (
    <ButtonTemplate color="secondary" variant="outlined" disabled>
        Secondary Outlined Disabled
    </ButtonTemplate>
);

export const SecondaryText: ComponentStory<typeof Button> = () => (
    <ButtonTemplate color="secondary" variant="text">
        Secondary Text
    </ButtonTemplate>
);

export const SecondaryTextDisabled: ComponentStory<typeof Button> = () => (
    <ButtonTemplate color="secondary" variant="text" disabled>
        Secondary Text Disabled
    </ButtonTemplate>
);
