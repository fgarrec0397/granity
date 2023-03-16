import { FieldType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { Vector3FieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Box, BoxProps, Vector3Input } from "@granity/ui";
import { FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type EditorOptionsVector3FieldProps = {
    option: Vector3FieldOption;
};

interface EditorOptionsVector3FieldStyles {
    inputsWrapper?: BoxProps;
}

const styles: EditorOptionsVector3FieldStyles = {
    inputsWrapper: {
        sx: {
            marginTop: "1rem",
            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
};

const EditorOptionsVector3Field: FC<EditorOptionsVector3FieldProps> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const inputChange = (inputValue: number, index: number) => {
        const vector3Value = updateArrayAt<Vector3Array>(
            (optionsValues?.[option.name]?.value as Vector3Array) || [0, 0, 0],
            inputValue,
            index
        );

        updateOptionsValues<Vector3Array>(vector3Value, option);
    };

    const value = optionsValues?.[option.name]?.value
        ? optionsValues?.[option.name]?.value
        : [0, 0, 0];

    if (option.fieldType === FieldType.Vector3) {
        return (
            <Box {...styles.inputsWrapper}>
                <Vector3Input title={option.displayName} value={value} onChange={inputChange} />
            </Box>
        );
    }

    return null;
};

export default EditorOptionsVector3Field;
