import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { useCallback } from "react";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const {
        dispatchAddScene,
        dispatchSetScenesStatus,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchSetCurrentSceneId,
        dispatchSetCurrentDefaultSceneId,
        dispatchUpdateScene,
        dispatchRemoveScene,
    } = useScenesDispatch();
    const { scenes, scenesIds, currentSceneId, currentDefaultSceneId, scenesStatus } =
        useScenesSelector();

    const add = (scene: ScenesDictionaryItem) => {
        dispatchAddScene(scene);
    };

    const setStatus = (status: FetchStatus) => {
        dispatchSetScenesStatus(status);
    };

    const addBatch = (newScenes: ScenesDictionary) => {
        dispatchAddScenesBatch(newScenes);
    };

    const reset = useCallback(
        (newScenes: ScenesDictionary, newCurrentSceneId: string) => {
            dispatchResetScenes(newScenes, newCurrentSceneId);
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
        scenes,
        scenesIds,
        scenesStatus,
        currentSceneId,
        currentDefaultSceneId,
        add,
        setStatus,
        addBatch,
        reset,
        updateScene,
        updateCurrentDefaultSceneId,
        updateCurrentSceneId,
        remove,
    };
};
