import { ComponentMeta, ComponentStory } from "@storybook/react";

import Box from "./Box";

export default {
    title: "Atoms/Box",
    component: Box,
} as ComponentMeta<typeof Box>;

const BoxTemplate: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const BoxDefault: ComponentStory<typeof Box> = () => (
    <BoxTemplate> The Box component </BoxTemplate>
);
