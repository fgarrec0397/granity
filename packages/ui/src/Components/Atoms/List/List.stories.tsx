import { ComponentMeta, ComponentStory } from "@storybook/react";

import List from "./List";

export default {
    title: "Atoms/List",
    component: List,
} as ComponentMeta<typeof List>;

const ListTemplate: ComponentStory<typeof List> = (args) => <List {...args} />;

export const ListDefault: ComponentStory<typeof List> = () => (
    <ListTemplate> The List component </ListTemplate>
);
