import { Accordion, AccordionDetails, AccordionSummary } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { FC } from "react";

import EditorWidgetPropertyFields from "./EditorWidgetPropertyFields";

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, currentWidgetProperties } = useWidgets();
    const openedAccordion = useAccordionDefaultOpened();

    if (selectedWidgets[0] && currentWidgetProperties) {
        return (
            <Accordion {...openedAccordion}>
                <AccordionSummary>Properties</AccordionSummary>
                <AccordionDetails>
                    <EditorWidgetPropertyFields
                        title="Position"
                        fields={[
                            {
                                label: "X",
                                value: Number(currentWidgetProperties?.position[0].toFixed(3)),
                            },
                            {
                                label: "Y",
                                value: Number(currentWidgetProperties?.position[1].toFixed(3)),
                            },
                            {
                                label: "Z",
                                value: Number(currentWidgetProperties?.position[2].toFixed(3)),
                            },
                        ]}
                    />
                    <EditorWidgetPropertyFields
                        title="Rotation"
                        fields={[
                            {
                                label: "X",
                                value: Number(currentWidgetProperties?.rotation[0].toFixed(3)),
                            },
                            {
                                label: "Y",
                                value: Number(currentWidgetProperties?.rotation[1].toFixed(3)),
                            },
                            {
                                label: "Z",
                                value: Number(currentWidgetProperties?.rotation[2].toFixed(3)),
                            },
                        ]}
                    />
                    <EditorWidgetPropertyFields
                        title="Scale"
                        fields={[
                            {
                                label: "X",
                                value: Number(currentWidgetProperties?.scale[0].toFixed(3)),
                            },
                            {
                                label: "Y",
                                value: Number(currentWidgetProperties?.scale[1].toFixed(3)),
                            },
                            {
                                label: "Z",
                                value: Number(currentWidgetProperties?.scale[2].toFixed(3)),
                            },
                        ]}
                    />
                </AccordionDetails>
            </Accordion>
        );
    }

    return null;
};

export default EditorWidgetProperties;
