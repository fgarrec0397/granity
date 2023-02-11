import { Box, BoxProps, MenuItem, Select, SelectChangeEvent } from "@granity/ui";
import { FieldType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
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

const EditorOptionsSelectField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = (event: SelectChangeEvent) => {
        updateOptionsValues(event.target.value as string, option);
    };

    if (option.fieldType === FieldType.Select) {
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
    }

    return null;
};

export default EditorOptionsSelectField;
