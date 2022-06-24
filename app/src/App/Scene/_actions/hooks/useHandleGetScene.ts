import { deserialize } from "@app/Core/utilities/componentSerializer";
import { off, on } from "@app/Core/utilities/events";
import { useWidgets, useWidgetsActions, useWidgetsModules } from "@app/Widgets/_actions/hooks";
import { useEffect } from "react";

import { fetchScene, saveScene } from "../_data/services";

export default () => {
    const { widgetsModules } = useWidgetsModules();
    const { addWidgetsBatch } = useWidgetsActions();
    const { widgets, widgetsDictionary } = useWidgets();

    useEffect(() => {
        const handleSaveFile = async () => {
            await saveScene({ widgets, widgetsDictionary });
        };

        on("saveFile:click", handleSaveFile);

        return () => {
            off("saveFile:click", handleSaveFile);
        };
    }, [widgets, widgetsDictionary]);

    useEffect(() => {
        const handleFetchScene = async () => {
            await fetchScene((data: any /* TODO fix this any type */) => {
                const fetchedWidgets = data.serializedWidgets.map((x: any) => {
                    const component = widgetsModules.find(
                        (y) => y.widgetDefinition.name === x.widgetDefinition.name
                    )?.component;

                    if (x.editorOptions?.meshHolder) {
                        x.editorOptions.meshHolder = deserialize(x.editorOptions.meshHolder);
                    }

                    return {
                        ...x,
                        component,
                    };
                });

                addWidgetsBatch(data.widgetsDictionary, fetchedWidgets);
            });
        };

        handleFetchScene();
    }, [addWidgetsBatch, widgetsModules]);
};
