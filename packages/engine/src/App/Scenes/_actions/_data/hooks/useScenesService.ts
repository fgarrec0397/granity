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

    const add = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatchAddScene(scene);
        },
        [dispatchAddScene]
    );

    const setStatus = useCallback(
        (status: FetchStatus) => {
            dispatchSetScenesStatus(status);
        },
        [dispatchSetScenesStatus]
    );

    const addBatch = useCallback(
        (newScenes: ScenesDictionary) => {
            dispatchAddScenesBatch(newScenes);
        },
        [dispatchAddScenesBatch]
    );

    const reset = useCallback(
        (newScenes: ScenesDictionary, newCurrentSceneId: string) => {
            dispatchResetScenes(newScenes, newCurrentSceneId);
        },
        [dispatchResetScenes]
    );

    const updateCurrentSceneId = useCallback(
        (sceneId: string) => {
            dispatchSetCurrentSceneId(sceneId);
        },
        [dispatchSetCurrentSceneId]
    );

    const updateCurrentDefaultSceneId = useCallback(
        (sceneId: string) => {
            dispatchSetCurrentDefaultSceneId(sceneId);
        },
        [dispatchSetCurrentDefaultSceneId]
    );

    const updateScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatchUpdateScene(scene);
        },
        [dispatchUpdateScene]
    );

    const remove = useCallback(
        (sceneId: string) => {
            dispatchRemoveScene(sceneId);
        },
        [dispatchRemoveScene]
    );

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
