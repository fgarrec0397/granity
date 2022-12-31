import { useCallback } from "react";

import { buildWidgetsInfoDictionary } from "../utilities/buildWidgetsInfoDictionary";
import { SerializedWidgetDictionary, WidgetsInfoDictionary } from "../widgetsTypes";
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
            widgetsInfoDictionary?: WidgetsInfoDictionary
        ) => {
            const loadedWidgetsModules = await loadWidgetsModules();

            if (serializedWidgets || widgetsInfoDictionary) {
                const deserializedWidgets = unserializeWidgets(
                    serializedWidgets!, // already checked if it's defined
                    loadedWidgetsModules
                );

                // Build a widgetsInfos dictionary base on locally up-to-date widgets
                const localWidgetsDictionary = buildWidgetsInfoDictionary(deserializedWidgets);
                const synchedWidgetDictionary = synchWidgets(
                    localWidgetsDictionary,
                    widgetsInfoDictionary! // already checked if it's defined
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
