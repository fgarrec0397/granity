import { useCallback } from "react";

import {
    WidgetObjectsDictionary,
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
        dispatchSetCurrentWidgetProperties,
        dispatchRemoveWidgetDictionary,
        dispatchOverrideWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
    } = useWidgetDispatch();

    const add = useCallback(
        (
            newWidget: WidgetObjectsDictionaryItem,
            newWidgetsDictionaryItem: WidgetsInfoDictionaryItem
        ) => {
            const requiredWidgetDictionaryItem =
                newWidgetsDictionaryItem as Required<WidgetsInfoDictionaryItem>;
            dispatchAddDictionary(requiredWidgetDictionaryItem);

            setWidgets((prevWidgets) => ({
                ...prevWidgets,
                [newWidget.id]: { ...newWidget },
            }));
        },
        [dispatchAddDictionary, setWidgets]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetObjectsDictionary, newWidgetsDictionary: WidgetsInfoDictionary) => {
            dispatchAddBatchDictionary(newWidgetsDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
        },
        [dispatchAddBatchDictionary, setWidgets]
    );

    const update = useCallback(
        (
            widget: WidgetObjectsDictionaryItem,
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
        (widget: WidgetObjectsDictionaryItem) => {
            removeSelection();
            dispatchRemoveWidgetDictionary(widget.id);

            delete widgets[widget.id];
        },
        [dispatchRemoveWidgetDictionary, removeSelection, widgets]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetObjectsDictionary) => {
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
            newWidgets: WidgetObjectsDictionary,
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
        update,
        select,
        widgets,
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
