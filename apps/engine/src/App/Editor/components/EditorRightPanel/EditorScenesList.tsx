import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { ScenesDictionary, ScenesDictionaryItem } from "@app/Scenes/_actions/scenesTypes";
import { Checkbox, FormField, FormFieldStylesProps, pxToRem, StyledWrapper } from "@granity/ui";
import { ChangeEvent, FC, useState } from "react";
import { css } from "styled-components";

import EditorItemsList from "./EditorItemsList";

type EditorScenesListStyles = {
    formField?: FormFieldStylesProps;
};

const styles: EditorScenesListStyles = {
    formField: {
        styling: {
            wrapperCss: css`
                width: 100%;
                max-width: ${pxToRem(300)};
            `,
        },
    },
};

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
                <StyledWrapper>
                    <FormField
                        label="Scene Name"
                        inputProps={{
                            name: "sceneName",
                            placeholder: "Enter your scene name here...",
                            onChange: (event) => setSceneName(event.target.value),
                        }}
                        {...styles.formField}
                    />
                    <Checkbox
                        label="Make it default scene"
                        checkboxProp={{
                            onChange: handleIsDefault,
                        }}
                    />
                </StyledWrapper>
            )}
        </EditorItemsList>
    );
};

export default EditorScenesList;
