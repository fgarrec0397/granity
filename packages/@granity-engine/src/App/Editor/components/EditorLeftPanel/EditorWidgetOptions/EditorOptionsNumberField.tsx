import { Box, BoxProps, TextField, TypographyProps } from "@granity/ui";
import { FieldType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { ChangeEvent, FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsNumberFieldStyles {
    inputsWrapper?: BoxProps;
    label?: TypographyProps;
}

const styles: EditorOptionsNumberFieldStyles = {
    inputsWrapper: {
        sx: {
            marginTop: "1rem",

            "&:first-child": {
                marginTop: 0,
            },
        },
    },
    label: {},
};

const EditorOptionsNumberField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    if (option.fieldType === FieldType.Number) {
        return (
            <Box {...styles.inputsWrapper}>
                <TextField
                    label={option.displayName}
                    inputProps={{
                        name: "displayName",
                        type: "number",
                        value: optionsValues ? (optionsValues[option.name]?.value as number) : "",
                        onChange,
                    }}
                />
            </Box>
        );
    }

    return null;
};

export default EditorOptionsNumberField;
