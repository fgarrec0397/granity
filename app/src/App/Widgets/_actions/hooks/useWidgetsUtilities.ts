import { useCallback } from "react";

import populateWidgetProps from "../utilities/populateWidgetProps";
import {
    SerializedWidgetDictionary,
    WidgetDictionary,
    WidgetModules,
    WidgetsInfoDictionary,
} from "../widgetsTypes";
import useWidgets from "./useWidgets";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { getWidgetModuleByName } = useWidgetsModules();
    const { widgetsInfoDictionary } = useWidgets();

    /**
     * Unserialize widgets based on the given widgetsModules as reference
     */
    const unserializeWidgets = useCallback(
        (serializedWidgets: SerializedWidgetDictionary, widgetsModules: WidgetModules[]) => {
            const deserializedWidgets: WidgetDictionary = {};

            // loop through all serialized widgets from the DB
            for (const key in serializedWidgets) {
                const serializedWidget = serializedWidgets[key];

                const widgetModule = getWidgetModuleByName(
                    serializedWidget.widgetDefinition.name,
                    widgetsModules
                );

                if (widgetModule) {
                    const widget = {
                        ...widgetModule,
                        id: "",
                    };

                    deserializedWidgets[serializedWidget.id] = {
                        ...widget,
                        id: serializedWidget.id,
                    };
                }
            }

            return deserializedWidgets;
        },
        [getWidgetModuleByName]
    );

    const mergeWidgetsDictionary = useCallback(
        (
            widgetsInfoDictionary1: WidgetsInfoDictionary,
            widgetsInfoDictionary2: WidgetsInfoDictionary
        ) => {
            Object.keys(widgetsInfoDictionary1).forEach((dictionaryItemKey) => {
                const dictionaryItem = widgetsInfoDictionary1[dictionaryItemKey];

                if (widgetsInfoDictionary2[dictionaryItemKey]) {
                    for (const key in widgetsInfoDictionary2[dictionaryItemKey].options) {
                        if (!Object.prototype.hasOwnProperty.call(dictionaryItem.options, key)) {
                            // Remove unexisting options on the local widget definitions options
                            delete widgetsInfoDictionary2[dictionaryItemKey].options?.[key];
                        }
                    }

                    // Make sure to keep the options left from the saved widget dictionary
                    widgetsInfoDictionary1[dictionaryItemKey].options =
                        widgetsInfoDictionary2[dictionaryItemKey].options;

                    // Make sure to keep the properties left from the saved widget dictionary
                    widgetsInfoDictionary1[dictionaryItemKey].properties =
                        widgetsInfoDictionary2[dictionaryItemKey].properties;
                }
            });

            return widgetsInfoDictionary1;
        },
        []
    );

    const getWidgetProps = useCallback(
        (id: string) => {
            return {
                ...populateWidgetProps(id, widgetsInfoDictionary),
            };
        },
        [widgetsInfoDictionary]
    );

    return { unserializeWidgets, mergeWidgetsDictionary, getWidgetProps };
};
