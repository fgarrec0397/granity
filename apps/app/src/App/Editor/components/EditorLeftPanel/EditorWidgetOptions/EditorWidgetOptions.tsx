import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { FieldType } from "@app/Widgets/_actions/widgetsConstants";
import { Collapse, Typography } from "@granity/ui";
import { FC } from "react";

import EditorOptionsCheckboxField from "./EditorOptionsCheckboxField";
import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";

const EditorWidgetOptions: FC = () => {
    const { selectedWidgets } = useWidgets();

    return (
        <Collapse title="Options">
            {selectedWidgets.length > 1 ? (
                <Typography>
                    {"Impossible to edit widget while more than one is selected"}
                </Typography>
            ) : (
                selectedWidgets.length > 0 &&
                selectedWidgets[0].options?.map((option) => {
                    if (option.fieldType === FieldType.Text) {
                        return <EditorOptionsTextField key={option.displayName} option={option} />;
                    }

                    if (option.fieldType === FieldType.Number) {
                        return (
                            <EditorOptionsNumberField key={option.displayName} option={option} />
                        );
                    }

                    if (option.fieldType === FieldType.Checkbox) {
                        return (
                            <EditorOptionsCheckboxField key={option.displayName} option={option} />
                        );
                    }

                    if (option.fieldType === FieldType.Select) {
                        return (
                            <EditorOptionsSelectField key={option.displayName} option={option} />
                        );
                    }

                    return null;
                })
            )}
        </Collapse>
    );
};

export default EditorWidgetOptions;
