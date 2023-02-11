import { Box, BoxProps, TextField } from "@granity/ui";
import { FieldType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { ChangeEvent, FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
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

const EditorOptionsTextField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    if (option.fieldType === FieldType.Text) {
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

export default EditorOptionsTextField;
