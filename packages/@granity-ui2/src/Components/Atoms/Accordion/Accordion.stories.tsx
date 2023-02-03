import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Accordion, { AccordionDetails, AccordionSummary } from "./Accordion";

export default {
    title: "Atoms/Accordion",
    component: Accordion,
} as ComponentMeta<typeof Accordion>;

const AccordionTemplate: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

export const Default: ComponentStory<typeof Accordion> = () => {
    return (
        <div>
            <AccordionTemplate>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </AccordionTemplate>
            <AccordionTemplate>
                <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </AccordionTemplate>
            <AccordionTemplate>
                <AccordionSummary aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>Accordion 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </AccordionTemplate>
            <AccordionTemplate disabled>
                <AccordionSummary aria-controls="panel4a-content" id="panel4a-header">
                    <Typography>Disabled Accordion</Typography>
                </AccordionSummary>
            </AccordionTemplate>
        </div>
    );
};
