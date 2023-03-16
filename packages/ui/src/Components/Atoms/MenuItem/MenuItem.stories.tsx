import { ComponentMeta, ComponentStory } from "@storybook/react";

import MenuItem from "./MenuItem";

export default {
    title: "Atoms/MenuItem",
    component: MenuItem,
} as ComponentMeta<typeof MenuItem>;

const MenuItemTemplate: ComponentStory<typeof MenuItem> = (args) => <MenuItem {...args} />;

export const MenuItemDefault: ComponentStory<typeof MenuItem> = () => <MenuItemTemplate />;
