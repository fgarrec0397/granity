import { SelectionFieldOption } from "@engine/App/Game/_actions/gameTypes";
import { Box, BoxProps, MenuItem, Select, SelectChangeEvent } from "@granity/ui";
import { FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

export type EditorOptionsSelectFieldProps = {
    option: SelectionFieldOption;
};

interface EditorOptionsSelectFieldStyles {
    inputsWrapper?: BoxProps;
}

const styles: EditorOptionsSelectFieldStyles = {
    inputsWrapper: {
        sx: {
            marginTop: "1rem",

            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
};

const EditorOptionsSelectField: FC<EditorOptionsSelectFieldProps> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = (event: SelectChangeEvent) => {
        updateOptionsValues(event.target.value as string, option);
    };

    return (
        <Box {...styles.inputsWrapper}>
            <Select
                label={option.displayName}
                value={optionsValues ? (optionsValues[option.name]?.value as string) : ""}
                onChange={onChange}
            >
                {(option.selectOptions || []).map((selectOpion) => (
                    <MenuItem key={selectOpion.value} value={selectOpion.value}>
                        {selectOpion.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default EditorOptionsSelectField;
