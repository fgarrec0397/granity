import { Accordion, AccordionDetails, AccordionSummary, Vector3Input } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { useAccordionDefaultOpened } from "@granity-engine/Theme/hooks/accordion";
import { FC } from "react";

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, currentWidgetProperties } = useWidgets();
    const openedAccordion = useAccordionDefaultOpened();

    if (selectedWidgets[0] && currentWidgetProperties) {
        return (
            <Accordion {...openedAccordion}>
                <AccordionSummary>Properties</AccordionSummary>
                <AccordionDetails>
                    <Vector3Input title="Position" value={currentWidgetProperties?.position} />
                    <Vector3Input title="Rotation" value={currentWidgetProperties?.rotation} />
                    <Vector3Input title="Scale" value={currentWidgetProperties?.scale} />
                </AccordionDetails>
            </Accordion>
        );
    }

    return null;
};

export default EditorWidgetProperties;
