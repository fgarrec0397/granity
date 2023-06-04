import { GameOptionsFieldTypes } from "@engine/App/Game/_actions/gameConstants";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import { useAccordionDefaultOpened } from "@engine/Theme/hooks/accordion";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@granity/ui";
import { FC } from "react";

import EditorOptionsCheckboxField from "./EditorOptionsCheckboxField";
import EditorOptionsFileField from "./EditorOptionsFileField";
import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";
import EditorOptionsVector3Field from "./EditorOptionsVector3Field";
import useOptionsValues from "./hooks/useOptionsValues";

const EditorGameWidgetOptions: FC = () => {
    const openedAccordion = useAccordionDefaultOpened();
    const { selectedGameWidgets } = useGameWidgets();
    const { optionsValues } = useOptionsValues();

    if (!selectedGameWidgets[0]) {
        return null;
    }

    const options = selectedGameWidgets[0].options;

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>Options</AccordionSummary>
            <AccordionDetails>
                <>
                    {selectedGameWidgets.length > 1 ? (
                        <Typography>
                            {"Impossible to edit widget while more than one is selected"}
                        </Typography>
                    ) : (
                        <>
                            {!options?.length ? (
                                <Typography>{"No options"}</Typography>
                            ) : (
                                selectedGameWidgets.length > 0 &&
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

                                    if (option.fieldType === GameOptionsFieldTypes.Text) {
                                        return <EditorOptionsTextField key={key} option={option} />;
                                    }

                                    if (option.fieldType === GameOptionsFieldTypes.Number) {
                                        return (
                                            <EditorOptionsNumberField key={key} option={option} />
                                        );
                                    }

                                    if (option.fieldType === GameOptionsFieldTypes.Checkbox) {
                                        return (
                                            <EditorOptionsCheckboxField key={key} option={option} />
                                        );
                                    }

                                    if (option.fieldType === GameOptionsFieldTypes.Vector3) {
                                        return (
                                            <EditorOptionsVector3Field key={key} option={option} />
                                        );
                                    }

                                    if (option.fieldType === GameOptionsFieldTypes.File) {
                                        return <EditorOptionsFileField key={key} option={option} />;
                                    }

                                    if (option.fieldType === GameOptionsFieldTypes.Select) {
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

export default EditorGameWidgetOptions;
