import { useCallback } from "react";

import { buildWidgetsDictionary } from "../utilities/buildWidgetDictionaryItem";
import { SerializedWidgetDictionary, WidgetsInfoDictionary } from "../widgetsTypes";
import useWidgets from "./useWidgets";
import useWidgetsModules from "./useWidgetsModules";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const { loadWidgetsModules } = useWidgetsModules();
    const { unserializeWidgets, mergeWidgetsDictionary } = useWidgetsUtilities();
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

                const newWidgetsDictionary = buildWidgetsDictionary(deserializedWidgets);
                const mergedWidgetDictionary = mergeWidgetsDictionary(
                    newWidgetsDictionary,
                    widgetsInfoDictionary! // already checked if it's defined
                );

                resetWidgets(deserializedWidgets, mergedWidgetDictionary);
            } else {
                resetWidgets();
            }
        },
        [loadWidgetsModules, mergeWidgetsDictionary, resetWidgets, unserializeWidgets]
    );

    return {
        initWidgets,
    };
};
