import { trigger } from "@app/Core/_actions/utilities/events";
import { useEffect, useState } from "react";

import { useSceneWidgetsContext, useWidgetsSelector } from "../_data/hooks";
import { WidgetSceneObject } from "../widgetsTypes";

export default () => {
    const { currentWidgetProperties, selected, widgetsDictionary } = useWidgetsSelector();
    const { widgets } = useSceneWidgetsContext();
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the current widgets ---> O(n) instead of O(n^2)
        const currentWidgets = Object.keys(widgets)
            .filter((x) => {
                const widget = widgets[x];

                if (widget.id) {
                    return selected.indexOf(widget.id) !== -1;
                }
                return false;
            })
            .map((x) => widgets[x]);

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    useEffect(() => {
        trigger("updateCurrentWidgetWithMesh", { updateOnlyProperties: true });
    }, [currentWidgetsState]);

    const getWidgetDictionaryFromWidget = (widgetId: string | undefined) => {
        if (widgetId) {
            return widgetsDictionary[widgetId];
        }
    };

    return {
        currentWidgets: currentWidgetsState,
        firstCurrentWidget: currentWidgetsState[0],
        currentWidgetProperties,
        widgets,
        widgetsDictionary,
        selected,
        getWidgetDictionaryFromWidget,
    };
};
