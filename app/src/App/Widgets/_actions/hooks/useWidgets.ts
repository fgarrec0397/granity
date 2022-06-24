import { useEffect, useState } from "react";

import { useSceneWidgetsContext, useWidgetsSelector } from "../_data/hooks";
import { WidgetSceneObject } from "../widgetsTypes";

export default () => {
    const { currentWidgetProperties, selected, widgetsDictionary } = useWidgetsSelector();
    const { widgets } = useSceneWidgetsContext();
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the current widgets ---> O(n) instead of O(n^2)
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    return {
        currentWidgets: currentWidgetsState,
        firstCurrentWidget: currentWidgetsState[0], // TODO - Remove this
        currentWidgetProperties,
        widgets,
        widgetsDictionary,
        selected,
    };
};
