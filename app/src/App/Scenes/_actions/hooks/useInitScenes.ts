import useInitWidgets from "@app/Widgets/_actions/hooks/useInitWidgets";
import { useCallback } from "react";

import { SceneApiResponseResult, ScenesDictionary } from "../scenesTypes";
import getDefaultSceneId from "../utilities/getDefaultSceneId";
import useScenes from "./useScenes";

export default () => {
    const { changeDefaultScene, resetScenes } = useScenes();
    const { initWidgets } = useInitWidgets();

    const initScenes = useCallback(
        async (result?: SceneApiResponseResult) => {
            if (result) {
                const newCurrentSceneId = getDefaultSceneId(result);
                const newCurrentScene = (result as ScenesDictionary)[newCurrentSceneId];

                initWidgets(
                    newCurrentScene.data.serializedWidgets,
                    newCurrentScene.data.widgetsInfoDictionary
                );

                resetScenes(result, newCurrentSceneId);
                changeDefaultScene(newCurrentScene);
            } else {
                initWidgets();
            }
        },
        [initWidgets, resetScenes, changeDefaultScene]
    );

    return {
        initScenes,
    };
};
