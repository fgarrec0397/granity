import { HasChildren } from "@granity/helpers";
import { useScenes } from "@granity-engine/api";
import { FC, useEffect } from "react";

import EditorCreateSceneModalContent from "./EditorCommon/EditorCreateSceneModalContent";
import EditorModal from "./EditorCommon/EditorModal";
import useCreateScene from "./EditorCommon/hooks/useCreateScene";

type Props = HasChildren;

const EditorWrapper: FC<Props> = ({ children }) => {
    const { hasScenes, scenesLoading } = useScenes();
    const { sceneName, handleChangeName, handleIsDefault, handleAddScene } = useCreateScene();

    useEffect(() => {}, []);

    return (
        <>
            <EditorModal
                title="Create a scene"
                open={!scenesLoading && !hasScenes()}
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
            {children}
        </>
    );
};

export default EditorWrapper;
