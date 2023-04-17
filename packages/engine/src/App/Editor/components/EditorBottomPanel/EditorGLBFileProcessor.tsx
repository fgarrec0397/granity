import { FC } from "react";

import EditorModal from "../EditorCommon/EditorModal";
import EditorUploadFileActionsStepper from "./EditorUploadFileActionsStepper";

type Props = {
    isOpen: boolean;
    files: File[];
    onClose: () => void;
};

const EditorGLBFileProcessor: FC<Props> = ({ isOpen, files, onClose }) => {
    const handleConfirmClick = () => {
        console.log("confirmed");
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
            {() => <EditorUploadFileActionsStepper files={files} />}
        </EditorModal>
    );
};

export default EditorGLBFileProcessor;
