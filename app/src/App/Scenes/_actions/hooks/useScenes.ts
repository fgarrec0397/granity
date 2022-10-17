import { usePrevious } from "@app/Common/hooks";
import { uidGenerator } from "@app/Common/utilities";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsUtilities from "@app/Widgets/_actions/hooks/useWidgetsUtilities";
import { buildWidgetsDictionary } from "@app/Widgets/_actions/utilities/buildWidgetDictionaryItem";
import serializeWidgets from "@app/Widgets/_actions/utilities/serializeWidgets";
import cloneDeep from "lodash/cloneDeep";
import { useCallback, useEffect, useState } from "react";

import useScenesService from "../_data/hooks/useScenesService";
import { SceneApiResponseResult, ScenesDictionary, ScenesDictionaryItem } from "../scenesTypes";
import getDefaultScene from "../utilities/getDefaultScene";
import getFirstNonDefaultScene from "../utilities/getFirstNonDefaultScene";

export default () => {
    const {
        scenes,
        currentSceneId,
        currentDefaultSceneId,
        save,
        add,
        addBatch,
        reset,
        updateCurrentSceneId,
        updateCurrentDefaultSceneId,
        updateScene,
        remove,
    } = useScenesService();
    const { unserializeWidgets, mergeWidgetsDictionary } = useWidgetsUtilities();
    const { widgets, widgetsInfoDictionary, resetWidgets } = useWidgets();
    const [lastSceneAdded, setLastSceneAdded] = useState<ScenesDictionaryItem>();
    const previousScenes = usePrevious(scenes);

    const getSceneById = useCallback(
        (sceneId: string | null) => {
            if (scenes && sceneId) {
                return scenes[sceneId];
            }

            return null;
        },
        [scenes]
    );

    const selectScene = useCallback(
        (sceneId: string) => {
            const scene = getSceneById(sceneId);

            if (scene) {
                const selectedSceneData = scene.data;
                const deserializedWidgets = unserializeWidgets(selectedSceneData.serializedWidgets);

                updateCurrentSceneId(sceneId);
                resetWidgets(deserializedWidgets, selectedSceneData.widgetsInfoDictionary, true);
            }
        },
        [getSceneById, resetWidgets, unserializeWidgets, updateCurrentSceneId]
    );

    useEffect(() => {
        if (
            scenes &&
            previousScenes &&
            lastSceneAdded &&
            currentSceneId !== lastSceneAdded.id &&
            Object.keys(scenes).length > Object.keys(previousScenes).length
        ) {
            selectScene(lastSceneAdded.id);
        }
    }, [currentSceneId, lastSceneAdded, previousScenes, scenes, selectScene]);

    const getCurrentScene = useCallback(() => {
        return getSceneById(currentSceneId);
    }, [currentSceneId, getSceneById]);

    const getCurrentDefaultScene = useCallback(() => {
        return getSceneById(currentDefaultSceneId);
    }, [currentDefaultSceneId, getSceneById]);

    const removeCurrentDefaultScene = useCallback(() => {
        const currentScene = getCurrentScene();
        if (currentScene) {
            updateScene({
                ...currentScene,
                isDefault: false,
            });
        }
    }, [getCurrentScene, updateScene]);

    const changeDefaultScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            updateScene({
                ...scene,
                isDefault: true,
            });
            removeCurrentDefaultScene();
            updateCurrentDefaultSceneId(scene.id);
        },
        [removeCurrentDefaultScene, updateCurrentDefaultSceneId, updateScene]
    );

    const addScene = useCallback(
        (name: string, isDefault: boolean) => {
            const scene: ScenesDictionaryItem = {
                id: uidGenerator(),
                name,
                isDefault,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                },
            };

            if (isDefault) {
                changeDefaultScene(scene);
            }

            add(scene);
            setLastSceneAdded(scene);
        },
        [add, changeDefaultScene]
    );

    const addScenesBatch = useCallback(
        (scenesDictionary: ScenesDictionary) => {
            addBatch(scenesDictionary);
        },
        [addBatch]
    );

    const resetScenes = useCallback(
        (scenesDictionary: ScenesDictionary, newCurrentSceneId: string) => {
            reset(scenesDictionary, newCurrentSceneId);
        },
        [reset]
    );

    const initScenes = useCallback(
        (result: SceneApiResponseResult) => {
            const newCurrentSceneId = getDefaultScene(result);
            const newCurrentScene = (result as ScenesDictionary)[newCurrentSceneId];

            const deserializedWidgets = unserializeWidgets(newCurrentScene.data.serializedWidgets);

            const newWidgetsDictionary = buildWidgetsDictionary(deserializedWidgets);
            const mergedWidgetDictionary = mergeWidgetsDictionary(
                newWidgetsDictionary,
                newCurrentScene.data.widgetsInfoDictionary
            );

            resetWidgets(deserializedWidgets, mergedWidgetDictionary);
            resetScenes(result, newCurrentSceneId);
            changeDefaultScene(newCurrentScene);
        },
        [unserializeWidgets, mergeWidgetsDictionary, resetWidgets, resetScenes, changeDefaultScene]
    );

    const saveScene = useCallback(async () => {
        const serializedWidgets = serializeWidgets(widgets);
        const currentScene = getCurrentScene();
        const scenesClone = cloneDeep(scenes);

        if (currentScene && scenesClone) {
            const scene: ScenesDictionaryItem = {
                ...currentScene,
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                },
            };

            updateScene(scene);

            scenesClone[currentScene.id] = {
                ...scenesClone[currentScene.id],
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                },
            };

            await save(scenesClone);
        }
    }, [getCurrentScene, save, scenes, updateScene, widgets, widgetsInfoDictionary]);

    const removeScene = useCallback(
        (sceneId: string) => {
            const sceneToRemove = getSceneById(sceneId);

            if (scenes) {
                if (sceneToRemove && sceneToRemove.isDefault) {
                    const nonDefaultScene = getFirstNonDefaultScene(scenes);

                    selectScene(nonDefaultScene.id);
                    changeDefaultScene(nonDefaultScene);
                }
            }

            remove(sceneId);
        },
        [getSceneById, scenes, remove, selectScene, changeDefaultScene]
    );

    return {
        scenes,
        currentScene: getCurrentScene(),
        currentSceneId,

        // Actions
        addScene,
        addScenesBatch,
        getSceneById,
        getCurrentScene,
        getCurrentDefaultScene,
        resetScenes,
        initScenes,
        saveScene,
        selectScene,
        removeScene,
    };
};
