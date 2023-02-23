import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    pxToRem,
    TextField,
    TextFieldProps,
} from "@granity/ui";
import { ChangeEvent, FC } from "react";

type EditorScenesListStyles = {
    textField?: TextFieldProps;
};

const styles: EditorScenesListStyles = {
    textField: {
        sx: {
            width: "100%",
            maxWidth: pxToRem(300),
        },
    },
};

type Props = {
    onChangeName: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleIsDefault: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const EditorCreateSceneModalContent: FC<Props> = ({ onChangeName, handleIsDefault }) => {
    return (
        <Box>
            <TextField
                label="Scene Name"
                onChange={onChangeName}
                placeholder="Enter your scene name here..."
                {...styles.textField}
            />
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox onChange={handleIsDefault} />}
                    label="Make it default scene"
                />
            </FormGroup>
        </Box>
    );
};

export default EditorCreateSceneModalContent;
