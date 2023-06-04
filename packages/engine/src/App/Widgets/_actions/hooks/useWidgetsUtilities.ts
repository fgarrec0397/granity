import { cloneDeep } from "@granity/helpers";
import { useCallback } from "react";

import {
    SerializedWidgetDictionary,
    WidgetDictionary,
    WidgetInfoDictionary,
    WidgetModule,
} from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { getWidgetModuleByName } = useWidgetsModules();

    /**
     * Unserialize widgets based on the given widgetsModules as reference
     */
    const unserializeWidgets = useCallback(
        (serializedWidgets: SerializedWidgetDictionary, widgetsModules: WidgetModule[]) => {
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
     * Synchronize two widgets info dictionaries by removing the options from widgetsInfoDictionary2 that are not on widgetsInfoDictionary1
     */
    const synchWidgetsInfoDictionary = useCallback(
        (
            widgetInfoDictionary1?: WidgetInfoDictionary,
            widgetInfoDictionary2?: WidgetInfoDictionary
        ) => {
            const clonedWidgetInfoDictionary1 = cloneDeep(widgetInfoDictionary1);
            const clonedWidgetInfoDictionary2 = cloneDeep(widgetInfoDictionary2);

            if (!clonedWidgetInfoDictionary1 && !clonedWidgetInfoDictionary2) {
                return;
            }

            if (!clonedWidgetInfoDictionary1 && clonedWidgetInfoDictionary2) {
                return clonedWidgetInfoDictionary2;
            }

            if (clonedWidgetInfoDictionary1 && !clonedWidgetInfoDictionary2) {
                return clonedWidgetInfoDictionary1;
            }

            Object.keys(clonedWidgetInfoDictionary1!).forEach((dictionaryItemKey) => {
                if (clonedWidgetInfoDictionary2?.[dictionaryItemKey]) {
                    if (clonedWidgetInfoDictionary1) {
                        // Make sure to keep the properties left from the saved widget dictionary
                        clonedWidgetInfoDictionary1[dictionaryItemKey] = {
                            ...clonedWidgetInfoDictionary2?.[dictionaryItemKey],
                        };
                    }
                }
            });

            return clonedWidgetInfoDictionary1;
        },
        []
    );

    return { unserializeWidgets, synchWidgetsInfoDictionary };
};
