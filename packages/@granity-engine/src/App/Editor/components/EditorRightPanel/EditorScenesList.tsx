import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    pxToRem,
    TextField,
    TextFieldProps,
} from "@granity/ui";
import useScenes from "@granity-engine/App/Scenes/_actions/hooks/useScenes";
import {
    ScenesDictionary,
    ScenesDictionaryItem,
} from "@granity-engine/App/Scenes/_actions/scenesTypes";
import { ChangeEvent, FC, useState } from "react";

import EditorItemsList from "./EditorItemsList";

type EditorScenesListStyles = {
    textField?: TextFieldProps;
};

const styles: EditorScenesListStyles = {
    textField: {
        sx: {
            width: "100%",
            maxWidth: pxToRem(300),
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
                <Box>
                    <TextField
                        label="Scene Name"
                        onChange={(event) => setSceneName(event.target.value)}
                        placeholder="Enter your scene name here..."
                        {...styles.textField}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={handleIsDefault} />}
                            label="Make it default scene"
                        />
                    </FormGroup>
                </Box>
            )}
        </EditorItemsList>
    );
};

export default EditorScenesList;
