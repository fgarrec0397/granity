import { GameWidgetProperties } from "@engine/App/Game/_actions/gameTypes";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import useUI from "@engine/App/UI/_actions/hooks/useUI";
import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Accordion, AccordionDetails, AccordionSummary, Vector3Input } from "@granity/ui";
import { FC } from "react";

const EditorGameWidgetProperties: FC = () => {
    const { selectedGameWidgets, updateGameWidget } = useGameWidgets();
    const { selectedWidgetProperties } = useUI();
    const openedAccordion = useAccordionDefaultOpened();

    const onChange = (
        propertyKey: keyof GameWidgetProperties,
        inputValue: number,
        index: number
    ) => {
        if (selectedWidgetProperties) {
            const newValue = updateArrayAt<Vector3Array>(
                selectedWidgetProperties?.[propertyKey] || [0, 0, 0],
                inputValue,
                index
            );

            updateGameWidget(selectedGameWidgets[0].id, {
                properties: {
                    ...selectedWidgetProperties,
                    [propertyKey]: newValue,
                },
            });
        }
    };

    if (selectedGameWidgets[0] && selectedWidgetProperties) {
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

export default EditorGameWidgetProperties;
