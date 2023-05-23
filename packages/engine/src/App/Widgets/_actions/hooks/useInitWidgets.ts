import { useCallback } from "react";

import { buildWidgetObjectInfoDictionary } from "../utilities/buildWidgetObjectInfoDictionary";
import { SerializedWidgetDictionary, WidgetInfoDictionary } from "../widgetsTypes";
import useWidgets from "./useWidgets";
import useWidgetsModules from "./useWidgetsModules";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const { widgetsModules } = useWidgetsModules();
    const { unserializeWidgets, synchWidgets } = useWidgetsUtilities();
    const { resetWidgets } = useWidgets();

    const initWidgets = useCallback(
        (
            serializedWidgets?: SerializedWidgetDictionary,
            widgetsObjectInfoDictionary?: WidgetInfoDictionary
        ) => {
            if (serializedWidgets || widgetsObjectInfoDictionary) {
                const deserializedWidgets = unserializeWidgets(
                    serializedWidgets!, // already checked if it's defined
                    widgetsModules
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
        [widgetsModules, unserializeWidgets, synchWidgets, resetWidgets]
    );

    return {
        initWidgets,
    };
};
