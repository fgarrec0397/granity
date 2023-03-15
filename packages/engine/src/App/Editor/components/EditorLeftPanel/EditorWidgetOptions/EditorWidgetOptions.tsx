import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@granity/ui";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { FieldType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { FC } from "react";

import EditorOptionsCheckboxField from "./EditorOptionsCheckboxField";
import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";
import EditorOptionsVector3Field from "./EditorOptionsVector3Field";
import useOptionsValues from "./hooks/useOptionsValues";

const EditorWidgetOptions: FC = () => {
    const openedAccordion = useAccordionDefaultOpened();
    const { selectedWidgets } = useWidgets();
    const { optionsValues } = useOptionsValues();

    if (!selectedWidgets[0]) {
        return null;
    }

    const options = selectedWidgets[0].options;

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>Options</AccordionSummary>
            <AccordionDetails>
                <>
                    {selectedWidgets.length > 1 ? (
                        <Typography>
                            {"Impossible to edit widget while more than one is selected"}
                        </Typography>
                    ) : (
                        <>
                            {!options?.length ? (
                                <Typography>{"No options"}</Typography>
                            ) : (
                                selectedWidgets.length > 0 &&
                                options?.map((option, index) => {
                                    const key = `${option.displayName}-${index}`;
                                    const isOptionVisible =
                                        typeof option.isVisible === "function"
                                            ? option.isVisible(optionsValues)
                                            : option.isVisible !== undefined
                                            ? option.isVisible
                                            : true;

                                    if (!isOptionVisible) {
                                        return null;
                                    }

                                    if (option.fieldType === FieldType.Text) {
                                        return <EditorOptionsTextField key={key} option={option} />;
                                    }

                                    if (option.fieldType === FieldType.Number) {
                                        return (
                                            <EditorOptionsNumberField key={key} option={option} />
                                        );
                                    }

                                    if (option.fieldType === FieldType.Checkbox) {
                                        return (
                                            <EditorOptionsCheckboxField key={key} option={option} />
                                        );
                                    }

                                    if (option.fieldType === FieldType.Vector3) {
                                        return (
                                            <EditorOptionsVector3Field key={key} option={option} />
                                        );
                                    }

                                    if (option.fieldType === FieldType.Select) {
                                        return (
                                            <EditorOptionsSelectField key={key} option={option} />
                                        );
                                    }

                                    return null;
                                })
                            )}
                        </>
                    )}
                </>
            </AccordionDetails>
        </Accordion>
    );
};

export default EditorWidgetOptions;
