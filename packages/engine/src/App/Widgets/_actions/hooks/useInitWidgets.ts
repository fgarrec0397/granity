import { useCallback } from "react";

import { buildWidgetInfoDictionary } from "../utilities/buildWidgetInfoDictionary";
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
            widgetsInfoDictionary?: WidgetInfoDictionary
        ) => {
            if (serializedWidgets || widgetsInfoDictionary) {
                const deserializedWidgets = unserializeWidgets(
                    serializedWidgets!, // already checked if it's defined
                    widgetsModules
                );

                // Build a widgetsInfos dictionary base on locally up-to-date widgets
                const localWidgetsDictionary = buildWidgetInfoDictionary(deserializedWidgets);
                const synchedWidgetDictionary = synchWidgets(
                    localWidgetsDictionary,
                    widgetsInfoDictionary! // already checked if it's defined
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
