import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { ChangeEvent, FC, useState } from "react";

import EditorModal from "../EditorCommon/EditorModal";
import EditorUploadFileActionsStepper from "./EditorUploadFileActionsStepper";

type Props = {
    currentPath: string;
    isOpen: boolean;
    files: File[];
    onClose: () => void;
};

const EditorGLBFileProcessor: FC<Props> = ({ currentPath, isOpen, files, onClose }) => {
    const [generateComponentCheckboxValue, setGenerateComponentCheckboxValue] = useState(false);
    const { generateJsxFromGlb } = useCore();

    const handleConfirmClick = async () => {
        if (generateComponentCheckboxValue) {
            await generateJsxFromGlb(`${currentPath}/${files[0].name}`);
        }
    };

    const onGenerateComponentCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGenerateComponentCheckboxValue(event.target.checked);
    };

    return (
        <EditorModal
            title="GLB file detected"
            open={isOpen}
            onClose={onClose}
            acceptButton={{
                text: "Confirm",
                callback: handleConfirmClick,
            }}
            cancelButton={{
                text: "Cancel",
            }}
        >
            {() => (
                <EditorUploadFileActionsStepper
                    files={files}
                    checkboxValue={generateComponentCheckboxValue}
                    onCheckboxChange={onGenerateComponentCheckboxChange}
                />
            )}
        </EditorModal>
    );
};

export default EditorGLBFileProcessor;
