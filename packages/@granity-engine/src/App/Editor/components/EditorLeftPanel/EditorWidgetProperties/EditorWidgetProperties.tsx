import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Accordion, AccordionDetails, AccordionSummary, Vector3Input } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { FC } from "react";

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, currentWidgetProperties, updateWidget } = useWidgets();
    const openedAccordion = useAccordionDefaultOpened();

    const positionChange = (inputValue: number, index: number) => {
        if (currentWidgetProperties) {
            const newPosition = updateArrayAt<Vector3Array>(
                currentWidgetProperties?.position || [0, 0, 0],
                inputValue,
                index
            );

            updateWidget(selectedWidgets[0].id, {
                properties: {
                    ...currentWidgetProperties,
                    position: newPosition,
                },
            });
        }
    };

    if (selectedWidgets[0] && currentWidgetProperties) {
        return (
            <Accordion {...openedAccordion}>
                <AccordionSummary>Properties</AccordionSummary>
                <AccordionDetails>
                    <Vector3Input
                        title="Position"
                        value={currentWidgetProperties?.position}
                        onChange={positionChange}
                    />
                    <Vector3Input title="Rotation" value={currentWidgetProperties?.rotation} />
                    <Vector3Input title="Scale" value={currentWidgetProperties?.scale} />
                </AccordionDetails>
            </Accordion>
        );
    }

    return null;
};

export default EditorWidgetProperties;
