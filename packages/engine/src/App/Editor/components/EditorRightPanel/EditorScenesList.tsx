import useScenes from "@engine/App/Scenes/_actions/hooks/useScenes";
import { FC } from "react";

import EditorCreateSceneModalContent from "../EditorCommon/EditorCreateSceneModalContent";
import useCreateScene from "../EditorCommon/hooks/useCreateScene";
import EditorAccordionList from "./EditorAccordionList";

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
        if (sceneName) {
            addScene(sceneName, isDefault);
        }
    };

    return (
        <EditorAccordionList
            itemsDictionaryIds={scenesIds}
            title="Scenes"
            noItemsText="No UI widget on the scene."
            triggerButtonText="Add Scene"
            handleClickRow={handleClickRow}
            displayItemName={displaySceneName}
            handleClickRemove={handleClickRemove}
            isDefault={(id) => scenes[id].isDefault}
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
        </EditorAccordionList>
    );
};

export default EditorScenesList;
