import { FieldType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { CheckboxFieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Box, BoxProps, TextField, TypographyProps } from "@granity/ui";
import { ChangeEvent, FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type EditorOptionsCheckboxFieldProps = {
    option: CheckboxFieldOption;
};

interface EditorOptionsCheckboxFieldStyles {
    inputsWrapper?: BoxProps;
    label?: TypographyProps;
}

const styles: EditorOptionsCheckboxFieldStyles = {
    inputsWrapper: {
        sx: {
            marginTop: "1rem",

            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
    label: {},
};

const EditorOptionsCheckboxField: FC<EditorOptionsCheckboxFieldProps> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    if (option.fieldType === FieldType.Checkbox) {
        return (
            <Box {...styles.inputsWrapper}>
                <TextField
                    label={option.displayName}
                    value={optionsValues ? (optionsValues[option.name]?.value as string) : ""}
                    onChange={onChange}
                />
            </Box>
        );
    }

    return null;
};

export default EditorOptionsCheckboxField;
