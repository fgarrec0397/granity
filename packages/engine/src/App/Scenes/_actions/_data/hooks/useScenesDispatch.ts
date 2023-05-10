import { FetchStatus } from "@engine/App/Core/_actions/coreTypes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import {
    addScene,
    addScenesBatch,
    removeScene,
    resetScenes,
    setCurrentDefaultSceneId,
    setCurrentSceneId,
    setScenesStatus,
    updateScene,
} from "../state/scenesReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatch(addScene(scene));
        },
        [dispatch]
    );

    const dispatchSetScenesStatus = useCallback(
        (status: FetchStatus) => {
            dispatch(setScenesStatus(status));
        },
        [dispatch]
    );

    const dispatchAddScenesBatch = useCallback(
        (scenes: ScenesDictionary) => {
            dispatch(addScenesBatch(scenes));
        },
        [dispatch]
    );

    const dispatchResetScenes = useCallback(
        (scenes: ScenesDictionary, newCurrentSceneId: string) => {
            dispatch(resetScenes({ scenes, currentSceneId: newCurrentSceneId }));
        },
        [dispatch]
    );

    const dispatchSetCurrentSceneId = useCallback(
        (sceneId: string) => {
            dispatch(setCurrentSceneId(sceneId));
        },
        [dispatch]
    );

    const dispatchSetCurrentDefaultSceneId = useCallback(
        (sceneId: string) => {
            dispatch(setCurrentDefaultSceneId(sceneId));
        },
        [dispatch]
    );

    const dispatchUpdateScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatch(updateScene(scene));
        },
        [dispatch]
    );

    const dispatchRemoveScene = useCallback(
        (sceneId: string) => {
            dispatch(removeScene(sceneId));
        },
        [dispatch]
    );

    return {
        dispatchAddScene,
        dispatchSetScenesStatus,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchUpdateScene,
        dispatchSetCurrentSceneId,
        dispatchSetCurrentDefaultSceneId,
        dispatchRemoveScene,
    };
};
