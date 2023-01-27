import { useCallback } from "react";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const {
        dispatchAddScene,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchSetCurrentSceneId,
        dispatchSetCurrentDefaultSceneId,
        dispatchUpdateScene,
        dispatchRemoveScene,
    } = useScenesDispatch();
    const scenesData = useScenesSelector();

    const add = (scene: ScenesDictionaryItem) => {
        dispatchAddScene(scene);
    };

    const addBatch = (scenes: ScenesDictionary) => {
        dispatchAddScenesBatch(scenes);
    };

    const reset = useCallback(
        (scenes: ScenesDictionary, newCurrentSceneId: string) => {
            dispatchResetScenes(scenes, newCurrentSceneId);
        },
        [dispatchResetScenes]
    );

    const updateCurrentSceneId = (sceneId: string) => {
        dispatchSetCurrentSceneId(sceneId);
    };

    const updateCurrentDefaultSceneId = (sceneId: string) => {
        dispatchSetCurrentDefaultSceneId(sceneId);
    };

    const updateScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatchUpdateScene(scene);
        },
        [dispatchUpdateScene]
    );

    const remove = (sceneId: string) => {
        dispatchRemoveScene(sceneId);
    };

    return {
        ...scenesData,
        add,
        addBatch,
        reset,
        updateScene,
        updateCurrentDefaultSceneId,
        updateCurrentSceneId,
        remove,
    };
};
