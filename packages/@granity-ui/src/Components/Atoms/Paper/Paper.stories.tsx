import { ComponentMeta, ComponentStory } from "@storybook/react";

import Paper from "./Paper";

export default {
    title: "Atoms/Paper",
    component: Paper,
} as ComponentMeta<typeof Paper>;

const PaperTemplate: ComponentStory<typeof Paper> = (args) => <Paper {...args} />;

export const PaperDefault: ComponentStory<typeof Paper> = () => (
    <PaperTemplate> The Paper component </PaperTemplate>
);
