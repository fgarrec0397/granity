import { FieldType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { FileFieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Box, BoxProps, TextField, Vector3Input } from "@granity/ui";
import { ChangeEvent, FC } from "react";

import useOptionsValues from "./hooks/useOptionsValues";

type EditorOptionsFileFieldProps = {
    option: FileFieldOption;
};

interface EditorOptionsFileFieldStyles {
    inputsWrapper?: BoxProps;
}

const styles: EditorOptionsFileFieldStyles = {
    inputsWrapper: {
        sx: {
            marginTop: "1rem",
            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
};

const EditorOptionsFileField: FC<EditorOptionsFileFieldProps> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, "event.target.value");

        // updateOptionsValues<Vector3Array>(vector3Value, option);
    };

    console.log(option.name, "option.name");
    console.log(optionsValues, "optionsValues");

    const value = optionsValues?.[option.name]?.value ? optionsValues?.[option.name]?.value : "";

    console.log(value, "value");

    return (
        <Box {...styles.inputsWrapper}>
            <TextField label={option.displayName} value={value} onChange={inputChange} />
            {/* <Vector3Input title={option.displayName} value={value} onChange={inputChange} /> */}
        </Box>
    );
};

export default EditorOptionsFileField;
