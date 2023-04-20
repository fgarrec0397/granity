import { TextFieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Box, BoxProps, TextField } from "@granity/ui";
import { ChangeEvent, FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type EditorOptionsTextFieldProps = {
    option: TextFieldOption;
};

interface EditorOptionsTextFieldStyles {
    inputsWrapper?: BoxProps;
}

const styles: EditorOptionsTextFieldStyles = {
    inputsWrapper: {
        sx: {
            marginTop: "1rem",
            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
};

const EditorOptionsTextField: FC<EditorOptionsTextFieldProps> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    return (
        <Box {...styles.inputsWrapper}>
            <TextField
                label={option.displayName}
                value={optionsValues ? (optionsValues[option.name]?.value as string) : ""}
                onChange={onChange}
            />
        </Box>
    );
};

export default EditorOptionsTextField;
