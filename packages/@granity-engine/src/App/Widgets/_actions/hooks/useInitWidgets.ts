import { useCallback } from "react";

import { buildWidgetObjectInfoDictionary } from "../utilities/buildWidgetObjectInfoDictionary";
import { SerializedWidgetDictionary, WidgetObjectInfoDictionary } from "../widgetsTypes";
import useWidgets from "./useWidgets";
import useWidgetsModules from "./useWidgetsModules";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const { loadWidgetsModules } = useWidgetsModules();
    const { unserializeWidgets, synchWidgets } = useWidgetsUtilities();
    const { resetWidgets } = useWidgets();

    const initWidgets = useCallback(
        async (
            serializedWidgets?: SerializedWidgetDictionary,
            widgetsObjectInfoDictionary?: WidgetObjectInfoDictionary
        ) => {
            const loadedWidgetsModules = await loadWidgetsModules();
            console.log(loadedWidgetsModules, "loadedWidgetsModules");

            if (serializedWidgets || widgetsObjectInfoDictionary) {
                const deserializedWidgets = unserializeWidgets(
                    serializedWidgets!, // already checked if it's defined
                    loadedWidgetsModules
                );

                // Build a widgetsInfos dictionary base on locally up-to-date widgets
                const localWidgetsDictionary = buildWidgetObjectInfoDictionary(deserializedWidgets);
                const synchedWidgetDictionary = synchWidgets(
                    localWidgetsDictionary,
                    widgetsObjectInfoDictionary! // already checked if it's defined
                );

                resetWidgets(deserializedWidgets, synchedWidgetDictionary);
            } else {
                resetWidgets();
            }
        },
        [loadWidgetsModules, synchWidgets, resetWidgets, unserializeWidgets]
    );

    return {
        initWidgets,
    };
};
