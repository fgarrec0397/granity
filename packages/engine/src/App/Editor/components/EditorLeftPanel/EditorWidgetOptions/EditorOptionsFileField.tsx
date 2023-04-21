import { FieldType } from "@engine/App/Widgets/_actions/widgetsConstants";
import { FileFieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import { updateArrayAt, Vector3Array } from "@granity/helpers";
import { Box, BoxProps, Button, TextField, Vector3Input } from "@granity/ui";
import { ChangeEvent, FC, useState } from "react";

import EditorFilesManager from "../../EditorCommon/EditorFilesManager";
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
    const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);

    const openFilesManager = () => setIsFileManagerOpen(true);
    const closeFilesManager = () => setIsFileManagerOpen(false);

    const onClick = () => {
        openFilesManager();
    };

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
            <Button onClick={onClick}>Select a file</Button>
            <EditorFilesManager
                title="Select a file"
                isOpen={isFileManagerOpen}
                onClose={closeFilesManager}
            />
        </Box>
    );
};

export default EditorOptionsFileField;
