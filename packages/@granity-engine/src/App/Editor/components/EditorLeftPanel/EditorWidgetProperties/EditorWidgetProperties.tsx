import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Accordion, AccordionDetails, AccordionSummary, Vector3Input } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { FC } from "react";

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, widgetPropertiesUI, updateWidget } = useWidgets();
    const openedAccordion = useAccordionDefaultOpened();

    const positionChange = (inputValue: number, index: number) => {
        if (widgetPropertiesUI) {
            const newPosition = updateArrayAt<Vector3Array>(
                widgetPropertiesUI?.position || [0, 0, 0],
                inputValue,
                index
            );

            updateWidget(selectedWidgets[0].id, {
                properties: {
                    ...widgetPropertiesUI,
                    position: newPosition,
                },
            });
        }
    };

    if (selectedWidgets[0] && widgetPropertiesUI) {
        return (
            <Accordion {...openedAccordion}>
                <AccordionSummary>Properties</AccordionSummary>
                <AccordionDetails>
                    <Vector3Input
                        title="Position"
                        value={widgetPropertiesUI?.position}
                        onChange={positionChange}
                    />
                    <Vector3Input title="Rotation" value={widgetPropertiesUI?.rotation} />
                    <Vector3Input title="Scale" value={widgetPropertiesUI?.scale} />
                </AccordionDetails>
            </Accordion>
        );
    }

    return null;
};

export default EditorWidgetProperties;
