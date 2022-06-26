import { deserialize } from "@app/Core/utilities/componentSerializer";
import { useWidgetsActions, useWidgetsModules } from "@app/Widgets/_actions/hooks";
import { WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import { useEffect } from "react";

import { fetchScene } from "../_data/services";
import { SceneApiResponseResult } from "../sceneTypes";

export default () => {
    const { widgetsModules, getComponentFromModules } = useWidgetsModules();
    const { addWidgetsBatch } = useWidgetsActions();

    useEffect(() => {
        const handleFetchScene = async () => {
            await fetchScene((data: SceneApiResponseResult) => {
                const deserializedWidgets = data.serializedWidgets.map((x) => {
                    const component = getComponentFromModules(x);

                    if (x.editorOptions?.meshHolder) {
                        x.editorOptions.meshHolder = deserialize(
                            x.editorOptions.meshHolder as string
                        );
                    }

                    return {
                        ...x,
                        component,
                    } as WidgetSceneObject;
                });

                addWidgetsBatch(data.widgetsDictionary, deserializedWidgets);
            });
        };

        handleFetchScene();
    }, [addWidgetsBatch, widgetsModules, getComponentFromModules]);
};
