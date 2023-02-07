import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FieldType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { FC } from "react";

import EditorOptionsCheckboxField from "./EditorOptionsCheckboxField";
import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";

const EditorWidgetOptions: FC = () => {
    const { selectedWidgets } = useWidgets();

    return (
        <Accordion>
            <AccordionSummary>Options</AccordionSummary>
            <AccordionDetails>
                <>
                    {selectedWidgets.length > 1 ? (
                        <Typography>
                            {"Impossible to edit widget while more than one is selected"}
                        </Typography>
                    ) : (
                        selectedWidgets.length > 0 &&
                        selectedWidgets[0].options?.map((option) => {
                            if (option.fieldType === FieldType.Text) {
                                return (
                                    <EditorOptionsTextField
                                        key={option.displayName}
                                        option={option}
                                    />
                                );
                            }

                            if (option.fieldType === FieldType.Number) {
                                return (
                                    <EditorOptionsNumberField
                                        key={option.displayName}
                                        option={option}
                                    />
                                );
                            }

                            if (option.fieldType === FieldType.Checkbox) {
                                return (
                                    <EditorOptionsCheckboxField
                                        key={option.displayName}
                                        option={option}
                                    />
                                );
                            }

                            if (option.fieldType === FieldType.Select) {
                                return (
                                    <EditorOptionsSelectField
                                        key={option.displayName}
                                        option={option}
                                    />
                                );
                            }

                            return null;
                        })
                    )}
                </>
            </AccordionDetails>
        </Accordion>
    );
};

export default EditorWidgetOptions;
