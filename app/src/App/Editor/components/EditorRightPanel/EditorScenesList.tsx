import Checkbox from "@app/Common/components/Html/Checkbox/Checkbox";
import FormField from "@app/Common/components/Html/FormField/FormField";
import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { ScenesDictionary, ScenesDictionaryItem } from "@app/Scenes/_actions/scenesTypes";
import { ChangeEvent, FC, useState } from "react";

import EditorItemsList from "./EditorItemsList";

const EditorScenesList: FC = () => {
    const [sceneName, setSceneName] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const { scenes, currentSceneId, addScene, loadScene, removeScene } = useScenes();

    const handleClickRow = (scene: ScenesDictionaryItem) => {
        loadScene(scene.id);
    };

    const handleClickRemove = (sceneId: string) => {
        removeScene(sceneId);
    };

    const handleIsDefault = (event: ChangeEvent<HTMLInputElement>): void => {
        setIsDefault(event.target.checked);
    };

    const handleAddScene = () => {
        addScene(sceneName, isDefault);
    };

    return (
        <EditorItemsList<ScenesDictionary>
            itemsDictionary={scenes || {}}
            title="Scenes"
            noItemsText="No UI widget on the scene."
            triggerButtonText="Add Scene"
            handleClickRow={handleClickRow}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(row) => currentSceneId === row.id}
            acceptButton={{
                text: "Add scene",
                callback: handleAddScene,
            }}
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {() => (
                <>
                    <FormField
                        label="Scene Name"
                        inputProps={{
                            name: "sceneName",
                            placeholder: "Enter your scene name here...",
                            onChange: (event) => setSceneName(event.target.value),
                        }}
                    />
                    <Checkbox
                        label="Make it default scene"
                        checkboxProp={{
                            onChange: handleIsDefault,
                        }}
                    />
                </>
            )}
        </EditorItemsList>
    );
};

export default EditorScenesList;
