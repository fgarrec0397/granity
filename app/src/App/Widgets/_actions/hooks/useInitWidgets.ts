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
            serializedWidgets: SerializedWidgetDictionary,
            widgetsInfoDictionary: WidgetsInfoDictionary
        ) => {
            const loadedWidgetsModules = await loadWidgetsModules();

            const deserializedWidgets = unserializeWidgets(serializedWidgets, loadedWidgetsModules);

            const newWidgetsDictionary = buildWidgetsDictionary(deserializedWidgets);
            const mergedWidgetDictionary = mergeWidgetsDictionary(
                newWidgetsDictionary,
                widgetsInfoDictionary
            );

            resetWidgets(deserializedWidgets, mergedWidgetDictionary);
        },
        [loadWidgetsModules, mergeWidgetsDictionary, resetWidgets, unserializeWidgets]
    );

    return {
        initWidgets,
    };
};
