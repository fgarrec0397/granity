import { useCallback, useMemo } from "react";

import filterWidgets from "../../utilities/filterWidgets";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectInfo,
    WidgetObjectInfoDictionary,
    WidgetObjectsDictionaryItem,
    WidgetProperties,
} from "../../widgetsTypes";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";
import useWidgetsSelector from "./useWidgetsSelector";

export default () => {
    const { currentWidgetProperties, widgetsObjectInfoDictionary } = useWidgetsSelector();
    const { widgets, selectedWidgets, setWidgets, setSelectedWidgets } = useWidgetsContext();
    const {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchSetCurrentWidgetProperties,
        dispatchRemoveWidgetDictionary,
        dispatchOverrideWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
    } = useWidgetDispatch();

    const { widgetsObjects, widgetsUI } = useMemo(() => filterWidgets(widgets), [widgets]);

    const add = useCallback(
        (newWidget: WidgetDictionaryItem, newWidgetObjectInfo?: WidgetObjectInfo) => {
            if (newWidgetObjectInfo) {
                const requiredWidgetDictionaryItem =
                    newWidgetObjectInfo as Required<WidgetObjectInfo>;
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
        (newWidgets: WidgetDictionary, newWidgetsDictionary: WidgetObjectInfoDictionary) => {
            dispatchAddBatchDictionary(newWidgetsDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
        },
        [dispatchAddBatchDictionary, setWidgets]
    );

    const update = useCallback(
        (widgetId: string, value: Omit<WidgetObjectInfo, "id">) => {
            dispatchUpdateDictionary(widgetId, value);
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
            newWidgetsDictionary: WidgetObjectInfoDictionary,
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
        update,
        select,
        widgets,
        widgetsObjects,
        widgetsUI,
        currentWidgetProperties,
        widgetsObjectInfoDictionary,
        selectedWidgets,
        removeSelection,
        remove,
        removeBatch,
        removeAll,
        reset,
        updateCurrentProperties,
    };
};
