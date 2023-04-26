import { useScenes } from "@engine/api";
import { HasChildren } from "@granity/helpers";
import { FC } from "react";

import EditorCreateSceneModalContent from "./EditorCommon/EditorCreateSceneModalContent";
import EditorModal from "./EditorCommon/EditorModal";
import useCreateScene from "./EditorCommon/hooks/useCreateScene";

type Props = HasChildren;

const EditorWrapper: FC<Props> = ({ children }) => {
    const { hasScenes, scenesStatus } = useScenes();
    const { sceneName, handleChangeName, handleIsDefault, handleAddScene } = useCreateScene();

    const openEditorModal = scenesStatus === "isSuccess" && !hasScenes();

    return (
        <div
            style={{
                boxShadow: "inset 0px 0px 0px 2px #f00",
            }}
        >
            {openEditorModal && (
                <EditorModal
                    title="Create a scene"
                    open={openEditorModal}
                    acceptButton={{
                        text: "Add scene",
                        callback: handleAddScene,
                        isDisabled: !sceneName,
                    }}
                >
                    {() => (
                        <EditorCreateSceneModalContent
                            onChangeName={handleChangeName}
                            handleIsDefault={handleIsDefault}
                        />
                    )}
                </EditorModal>
            )}
            {children}
        </div>
    );
};

export default EditorWrapper;
