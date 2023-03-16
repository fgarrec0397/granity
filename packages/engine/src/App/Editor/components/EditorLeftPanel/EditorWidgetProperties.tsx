import { WidgetProperties } from "@engine/api";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Accordion, AccordionDetails, AccordionSummary, Vector3Input } from "@granity/ui";
import { FC } from "react";

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, widgetPropertiesUI, updateWidget } = useWidgets();
    const openedAccordion = useAccordionDefaultOpened();

    const onChange = (propertiyKey: keyof WidgetProperties, inputValue: number, index: number) => {
        if (widgetPropertiesUI) {
            const newValue = updateArrayAt<Vector3Array>(
                widgetPropertiesUI?.[propertiyKey] || [0, 0, 0],
                inputValue,
                index
            );

            updateWidget(selectedWidgets[0].id, {
                properties: {
                    ...widgetPropertiesUI,
                    [propertiyKey]: newValue,
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
                        onChange={(inputValue: number, index: number) =>
                            onChange("position", inputValue, index)
                        }
                    />
                    <Vector3Input
                        title="Rotation"
                        value={widgetPropertiesUI?.rotation}
                        onChange={(inputValue: number, index: number) =>
                            onChange("rotation", inputValue, index)
                        }
                    />
                    <Vector3Input
                        title="Scale"
                        value={widgetPropertiesUI?.scale}
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
