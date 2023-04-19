import { ProcessesService } from "@engine/App/Core/_actions/_data/processesService";
import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useMutation, useQueryClient } from "@granity/helpers";
import { ChangeEvent, FC, useState } from "react";

import EditorModal from "../EditorCommon/EditorModal";
import EditorUploadFileActionsStepper from "./EditorUploadFileActionsStepper";

type Props = {
    isOpen: boolean;
    files: File[];
    onClose: () => void;
};

const EditorGLBFileProcessor: FC<Props> = ({ isOpen, files, onClose }) => {
    const [generateComponentCheckboxValue, setGenerateComponentCheckboxValue] = useState(false);
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();

    const postProcessMutation = useMutation({
        mutationKey: ["process"],
        mutationFn: ProcessesService.post,
        onSuccess: (data) => {
            queryClient.setQueryData(["process"], data);
        },
    });

    const handleConfirmClick = async () => {
        console.log(generateComponentCheckboxValue, "generateComponentCheckboxValue confirmed");
        await postProcessMutation.mutateAsync({
            endpoint: endpoints.processes.generateJsxFromGlb,
            processName: "test process",
        });
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
