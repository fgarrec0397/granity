import { useCallback } from "react";

import populateWidgetProps from "../utilities/populateWidgetProps";
import {
    SerializedWidgetDictionary,
    WidgetDictionary,
    WidgetModules,
    WidgetObjectInfoDictionary,
} from "../widgetsTypes";
import useWidgets from "./useWidgets";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { getWidgetModuleByName } = useWidgetsModules();
    const { widgetsObjectInfoDictionary } = useWidgets();

    /**
     * Unserialize widgets based on the given widgetsModules as reference
     */
    const unserializeWidgets = useCallback(
        (serializedWidgets: SerializedWidgetDictionary, widgetsModules: WidgetModules[]) => {
            const deserializedWidgets: WidgetDictionary = {};

            // loop through all serialized widgets from the DB
            for (const key in serializedWidgets) {
                const serializedWidget = serializedWidgets[key];

                const widgetModule = getWidgetModuleByName(serializedWidget.name, widgetsModules);

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

    /**
     * Synchronize two widgets by removing the options from widgetsInfoDictionary2 that are not on widgetsInfoDictionary1
     */
    const synchWidgets = useCallback(
        (
            widgetObjectInfoDictionary1: WidgetObjectInfoDictionary,
            widgetObjectInfoDictionary2: WidgetObjectInfoDictionary
        ) => {
            Object.keys(widgetObjectInfoDictionary1).forEach((dictionaryItemKey) => {
                const dictionaryItem = widgetObjectInfoDictionary1[dictionaryItemKey];

                if (widgetObjectInfoDictionary2[dictionaryItemKey]) {
                    for (const key in widgetObjectInfoDictionary2[dictionaryItemKey].options) {
                        if (!Object.prototype.hasOwnProperty.call(dictionaryItem.options, key)) {
                            // Remove unexisting options on the local widget definitions options
                            delete widgetObjectInfoDictionary2[dictionaryItemKey].options?.[key];
                        }
                    }

                    // Make sure to keep the properties left from the saved widget dictionary
                    widgetObjectInfoDictionary1[dictionaryItemKey] = {
                        ...widgetObjectInfoDictionary2[dictionaryItemKey],
                    };
                }
            });

            return widgetObjectInfoDictionary1;
        },
        []
    );

    const getWidgetProps = useCallback(
        (id: string) => {
            return {
                ...populateWidgetProps(id, widgetsObjectInfoDictionary),
            };
        },
        [widgetsObjectInfoDictionary]
    );

    return { unserializeWidgets, synchWidgets, getWidgetProps };
};
