import { NumberFieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Box, BoxProps, TextField, TypographyProps } from "@granity/ui";
import { ChangeEvent, FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type EditorOptionsNumberFieldProps = {
    option: NumberFieldOption;
};

interface EditorOptionsNumberFieldStyles {
    inputsWrapper?: BoxProps;
    label?: TypographyProps;
}

const styles: EditorOptionsNumberFieldStyles = {
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

const EditorOptionsNumberField: FC<EditorOptionsNumberFieldProps> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    return (
        <Box {...styles.inputsWrapper}>
            <TextField
                label={option.displayName}
                inputProps={{
                    name: "displayName",
                    type: "number",
                    value: optionsValues ? optionsValues[option.name]?.value : "",
                    onChange,
                }}
            />
        </Box>
    );

    return null;
};

export default EditorOptionsNumberField;
