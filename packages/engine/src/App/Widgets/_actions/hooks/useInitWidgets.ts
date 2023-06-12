import { GameWidgetDictionary, GameWidgetInfoDictionary } from "@engine/api";
import useInitGameWidgets from "@engine/App/Game/_actions/hooks/useInitGameWidgets";
import { useCallback } from "react";

import { buildWidgetInfoDictionary } from "../utilities/buildWidgetInfoDictionary";
import { SerializedWidgetDictionary, WidgetInfoDictionary, WidgetsIds } from "../widgetsTypes";
import useWidgets from "./useWidgets";
import useWidgetsModules from "./useWidgetsModules";
import useWidgetsUtilities from "./useWidgetsUtilities";

export default () => {
    const { widgetsModules } = useWidgetsModules();
    const { unserializeWidgets, synchWidgetsInfoDictionary } = useWidgetsUtilities();
    const { resetWidgets } = useWidgets();
    const { initGameWidgets } = useInitGameWidgets();

    const initWidgets = useCallback(
        (
            serializedWidgets?: SerializedWidgetDictionary,
            widgetsInfoDictionary?: WidgetInfoDictionary,
            widgetsIds?: WidgetsIds
        ) => {
            if (!serializedWidgets || !widgetsInfoDictionary) {
                return resetWidgets();
            }

            const deserializedWidgets = unserializeWidgets(
                serializedWidgets!, // already checked if it's defined
                widgetsModules
            );

            if (!deserializedWidgets) {
                return resetWidgets();
            }

            const initializedWidgetsInfoDictionary = initGameWidgets(
                deserializedWidgets as GameWidgetDictionary,
                widgetsInfoDictionary as GameWidgetInfoDictionary
            );

            // Build a widgetsInfos dictionary base on locally up-to-date widgets
            const localWidgetsInfoDictionary = buildWidgetInfoDictionary(deserializedWidgets);
            const synchedWidgetDictionary = synchWidgetsInfoDictionary(
                localWidgetsInfoDictionary,
                initializedWidgetsInfoDictionary! // already checked if it's defined
            );

            resetWidgets(deserializedWidgets, synchedWidgetDictionary, widgetsIds);
        },
        [
            unserializeWidgets,
            widgetsModules,
            initGameWidgets,
            synchWidgetsInfoDictionary,
            resetWidgets,
        ]
    );

    return {
        initWidgets,
    };
};
