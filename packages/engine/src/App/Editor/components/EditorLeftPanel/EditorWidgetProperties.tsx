import { WidgetProperties } from "@engine/api";
import useUI from "@engine/App/UI/_actions/hooks/useUI";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Accordion, AccordionDetails, AccordionSummary, Vector3Input } from "@granity/ui";
import { FC } from "react";

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, updateWidget } = useWidgets();
    const { selectedWidgetProperties } = useUI();
    const openedAccordion = useAccordionDefaultOpened();

    const onChange = (propertiyKey: keyof WidgetProperties, inputValue: number, index: number) => {
        if (selectedWidgetProperties) {
            const newValue = updateArrayAt<Vector3Array>(
                selectedWidgetProperties?.[propertiyKey] || [0, 0, 0],
                inputValue,
                index
            );

            updateWidget(selectedWidgets[0].id, {
                properties: {
                    ...selectedWidgetProperties,
                    [propertiyKey]: newValue,
                },
            });
        }
    };

    if (selectedWidgets[0] && selectedWidgetProperties) {
        return (
            <Accordion {...openedAccordion}>
                <AccordionSummary>Properties</AccordionSummary>
                <AccordionDetails>
                    <Vector3Input
                        title="Position"
                        value={selectedWidgetProperties?.position}
                        onChange={(inputValue: number, index: number) =>
                            onChange("position", inputValue, index)
                        }
                    />
                    <Vector3Input
                        title="Rotation"
                        value={selectedWidgetProperties?.rotation}
                        onChange={(inputValue: number, index: number) =>
                            onChange("rotation", inputValue, index)
                        }
                    />
                    <Vector3Input
                        title="Scale"
                        value={selectedWidgetProperties?.scale}
                        onChange={(inputValue: number, index: number) =>
                            onChange("scale", inputValue, index)
                        }
                    />
                </AccordionDetails>
            </Accordion>
        );
    }

    return null;
};

export default EditorWidgetProperties;
