import { Alert, Box, Checkbox, FormControlLabel, FormGroup } from "@granity/ui";
import { ChangeEvent, FC } from "react";

type Props = {
    files: File[];
    checkboxValue: boolean;
    onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const EditorUploadFileActionsStepper: FC<Props> = ({ files, checkboxValue, onCheckboxChange }) => {
    return (
        <>
            {files.length > 1 && (
                <Alert severity="warning">
                    Multiple glb files not supported. Only {files[0].name} will be processed.
                </Alert>
            )}
            <Box>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox value={checkboxValue} onChange={onCheckboxChange} />}
                        label="Generate a JSX component from this .glb file?"
                    />
                </FormGroup>
            </Box>
        </>
    );
};

export default EditorUploadFileActionsStepper;
