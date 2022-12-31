import { useCallback } from "react";

import filterWidgets from "../../utilities/filterWidgets";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectsDictionaryItem,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetsInfoDictionary,
    WidgetsInfoDictionaryItem,
} from "../../widgetsTypes";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";
import useWidgetsSelector from "./useWidgetsSelector";

export default () => {
    const { currentWidgetProperties, widgetsInfoDictionary } = useWidgetsSelector();
    const { widgets, selectedWidgets, setWidgets, setSelectedWidgets } = useWidgetsContext();
    const {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchUpdateDictionaryV2,
        dispatchSetCurrentWidgetProperties,
        dispatchRemoveWidgetDictionary,
        dispatchOverrideWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
    } = useWidgetDispatch();
    const { widgetsObjects, widgetsUI } = filterWidgets(widgets);

    const add = useCallback(
        (newWidget: WidgetDictionaryItem, newWidgetsDictionaryItem?: WidgetsInfoDictionaryItem) => {
            if (newWidgetsDictionaryItem) {
                const requiredWidgetDictionaryItem =
                    newWidgetsDictionaryItem as Required<WidgetsInfoDictionaryItem>;
                dispatchAddDictionary(requiredWidgetDictionaryItem);
            }

            setWidgets((prevWidgets) => ({
                ...prevWidgets,
                [newWidget.id]: { ...newWidget },
            }));
        },
        [dispatchAddDictionary, setWidgets]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetDictionary, newWidgetsDictionary: WidgetsInfoDictionary) => {
            dispatchAddBatchDictionary(newWidgetsDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
        },
        [dispatchAddBatchDictionary, setWidgets]
    );

    const updateV2 = useCallback(
        (widgetId: string, value: Omit<WidgetsInfoDictionaryItem, "id">) => {
            dispatchUpdateDictionaryV2(widgetId, value);
        },
        [dispatchUpdateDictionaryV2]
    );

    const update = useCallback(
        (
            widget: WidgetDictionaryItem,
            widgetProperties?: WidgetProperties,
            widgetOptions?: WidgetOptionsValues
        ) => {
            dispatchUpdateDictionary({
                id: widget.id,
                options: widgetOptions,
                properties: widgetProperties,
            });
        },
        [dispatchUpdateDictionary]
    );

    const select = useCallback(
        (widgetsToSelect: WidgetObjectsDictionaryItem[]) => {
            setSelectedWidgets(widgetsToSelect);
        },
        [setSelectedWidgets]
    );

    const removeSelection = useCallback(() => {
        select([]);
    }, [select]);

    const remove = useCallback(
        (widgetId: string) => {
            removeSelection();
            dispatchRemoveWidgetDictionary(widgetId);

            delete widgets[widgetId];
        },
        [dispatchRemoveWidgetDictionary, removeSelection, widgets]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetDictionary) => {
            const widgetsIdsToDelete = Object.keys(widgetsToDelete);

            removeSelection();
            dispatchRemoveBatchWidgetDictionary(widgetsIdsToDelete);
            Object.keys(widgetsToDelete).forEach((x) => delete widgets[x]);
        },
        [dispatchRemoveBatchWidgetDictionary, removeSelection, widgets]
    );

    const removeAll = useCallback(() => {
        removeBatch(widgets);
    }, [removeBatch, widgets]);

    const updateCurrentProperties = useCallback(
        (widgetProperties: WidgetProperties) => {
            dispatchSetCurrentWidgetProperties(widgetProperties);
        },
        [dispatchSetCurrentWidgetProperties]
    );

    const reset = useCallback(
        (
            newWidgets: WidgetDictionary,
            newWidgetsDictionary: WidgetsInfoDictionary,
            shouldRemoveAll?: boolean
        ) => {
            if (shouldRemoveAll) {
                removeAll();
            }

            setWidgets(newWidgets);
            dispatchOverrideWidgetDictionary(newWidgetsDictionary);
        },
        [dispatchOverrideWidgetDictionary, removeAll, setWidgets]
    );

    return {
        add,
        addBatch,
        updateV2,
        update,
        select,
        widgets,
        widgetsObjects,
        widgetsUI,
        currentWidgetProperties,
        widgetsInfoDictionary,
        selectedWidgets,
        removeSelection,
        remove,
        removeBatch,
        removeAll,
        reset,
        updateCurrentProperties,
    };
};
