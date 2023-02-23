import useScenes from "@granity-engine/App/Scenes/_actions/hooks/useScenes";
import { FC } from "react";

import EditorCreateSceneModalContent from "../EditorCommon/EditorCreateSceneModalContent";
import useCreateScene from "../EditorCommon/hooks/useCreateScene";
import EditorItemsList from "./EditorItemsList";

const EditorScenesList: FC = () => {
    const { sceneName, handleChangeName, isDefault, handleIsDefault } = useCreateScene();

    const {
        scenes,
        scenesIds,
        currentSceneId,
        addScene,
        displaySceneName,
        loadScene,
        removeScene,
    } = useScenes();

    const handleClickRow = (id: string) => {
        const scene = scenes?.[id];
        if (scene) {
            loadScene(scene.id);
        }
    };

    const handleClickRemove = (sceneId: string) => {
        removeScene(sceneId);
    };

    const handleAddScene = () => {
        addScene(sceneName, isDefault);
    };

    return (
        <EditorItemsList
            itemsDictionaryIds={scenesIds}
            title="Create a scene"
            noItemsText="No UI widget on the scene."
            triggerButtonText="Add Scene"
            handleClickRow={handleClickRow}
            displayItemName={displaySceneName}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(id) => currentSceneId === id}
            acceptButton={{
                text: "Add scene",
                callback: handleAddScene,
            }}
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {() => (
                <EditorCreateSceneModalContent
                    onChangeName={handleChangeName}
                    handleIsDefault={handleIsDefault}
                />
            )}
        </EditorItemsList>
    );
};

export default EditorScenesList;
