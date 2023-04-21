import { FileItem } from "@engine/api";
import { FileFieldOption } from "@engine/App/Widgets/_actions/widgetsTypes";
import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    pxToRem,
    TextField,
    TextFieldProps,
} from "@granity/ui";
import path from "path";
import { ChangeEvent, FC, useState } from "react";

import EditorFilesManager from "../../EditorCommon/EditorFilesManager";
import useOptionsValues from "./hooks/useOptionsValues";

type EditorOptionsFileFieldProps = {
    option: FileFieldOption;
};

interface EditorOptionsFileFieldStyles {
    inputsWrapper?: BoxProps;
    fileFieldWrapper?: BoxProps;
    textField?: TextFieldProps;
    button?: ButtonProps;
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
    fileFieldWrapper: {
        sx: {
            display: "flex",
            alignItems: "flex-end",
        },
    },
    textField: {
        sx: {
            marginRight: pxToRem(10),
        },
    },
    button: {
        color: "secondary",
        variant: "outlined",
        sx: {
            whiteSpace: "nowrap",
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
        updateOptionsValues(event.target.value, option);
    };

    const onSelectFile = (file: FileItem) => {
        const normalizedPath = path.normalize(file.path);
        updateOptionsValues(normalizedPath, option);
        closeFilesManager();
    };

    const value = optionsValues?.[option.name]?.value ? optionsValues?.[option.name]?.value : "";

    return (
        <Box {...styles.inputsWrapper}>
            <Box {...styles.fileFieldWrapper}>
                <TextField
                    label={option.displayName}
                    value={value}
                    onChange={inputChange}
                    {...styles.textField}
                />
                <Button onClick={onClick} {...styles.button}>
                    Select a file
                </Button>
            </Box>
            <EditorFilesManager
                title="Select a file"
                isOpen={isFileManagerOpen}
                onClose={closeFilesManager}
                onSelectFile={onSelectFile}
            />
        </Box>
    );
};

export default EditorOptionsFileField;
