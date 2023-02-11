import { ComponentMeta, ComponentStory } from "@storybook/react";

import Typography from "./Typography";

export default {
    title: "Atoms/Typography",
    component: Typography,
} as ComponentMeta<typeof Typography>;

const TypographyTemplate: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const TypographyDefault: ComponentStory<typeof Typography> = () => (
    <>
        <TypographyTemplate variant="h1" gutterBottom>
            h1. Heading
        </TypographyTemplate>
        <TypographyTemplate variant="h2" gutterBottom>
            h2. Heading
        </TypographyTemplate>
        <TypographyTemplate variant="h3" gutterBottom>
            h3. Heading
        </TypographyTemplate>
        <TypographyTemplate variant="h4" gutterBottom>
            h4. Heading
        </TypographyTemplate>
        <TypographyTemplate variant="h5" gutterBottom>
            h5. Heading
        </TypographyTemplate>
        <TypographyTemplate variant="h6" gutterBottom>
            h6. Heading
        </TypographyTemplate>
        <TypographyTemplate variant="subtitle1" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
            tenetur
        </TypographyTemplate>
        <TypographyTemplate variant="subtitle2" gutterBottom>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
            tenetur
        </TypographyTemplate>
        <TypographyTemplate variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
            numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </TypographyTemplate>
        <TypographyTemplate variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
            numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </TypographyTemplate>
        <TypographyTemplate variant="button" display="block" gutterBottom>
            button text
        </TypographyTemplate>
        <TypographyTemplate variant="caption" display="block" gutterBottom>
            caption text
        </TypographyTemplate>
        <TypographyTemplate variant="overline" display="block" gutterBottom>
            overline text
        </TypographyTemplate>
    </>
);
