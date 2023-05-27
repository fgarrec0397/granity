import { CheckboxFieldOption } from "@engine/App/Game/_actions/gameTypes";
import { Box, BoxProps, Checkbox, FormControlLabel, FormGroup, TypographyProps } from "@granity/ui";
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
        updateOptionsValues(target.checked, option);
    };

    return (
        <Box {...styles.inputsWrapper}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked={optionsValues?.[option.name]?.value}
                            onChange={onChange}
                        />
                    }
                    label={option.displayName}
                />
            </FormGroup>
        </Box>
    );
};

export default EditorOptionsCheckboxField;
