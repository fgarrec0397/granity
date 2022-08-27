import { useCallback } from "react";

import {
    WidgetObjects,
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
    WidgetsDictionaryItem,
} from "../../widgetsTypes";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";

export default () => {
    const { widgets, setWidgets, setSelectedWidgets } = useWidgetsContext();
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
        (newWidget: WidgetSceneObject, newWidgetsDictionaryItem: WidgetsDictionaryItem) => {
            const requiredWidgetDictionaryItem =
                newWidgetsDictionaryItem as Required<WidgetsDictionaryItem>;
            dispatchAddDictionary(requiredWidgetDictionaryItem);

            setWidgets((prevWidgets) => ({
                ...prevWidgets,
                [newWidget.id]: { ...newWidget },
            }));
        },
        [dispatchAddDictionary, setWidgets]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetObjects, newWidgetsDictionary: WidgetsDictionary) => {
            dispatchAddBatchDictionary(newWidgetsDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
        },
        [dispatchAddBatchDictionary, setWidgets]
    );

    const update = useCallback(
        (
            widget: WidgetSceneObject,
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
        (widgetsToSelect: WidgetSceneObject[]) => {
            setSelectedWidgets(widgetsToSelect);
        },
        [setSelectedWidgets]
    );

    const removeSelection = useCallback(() => {
        select([]);
    }, [select]);

    const remove = useCallback(
        (widget: WidgetSceneObject) => {
            removeSelection();
            dispatchRemoveWidgetDictionary(widget.id);

            delete widgets[widget.id];
        },
        [dispatchRemoveWidgetDictionary, removeSelection, widgets]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetObjects) => {
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
        (newWidgets: WidgetObjects, newWidgetsDictionary: WidgetsDictionary) => {
            dispatchOverrideWidgetDictionary(newWidgetsDictionary);
            setWidgets(newWidgets);
        },
        [dispatchOverrideWidgetDictionary, setWidgets]
    );

    return {
        add,
        addBatch,
        update,
        select,
        removeSelection,
        remove,
        removeBatch,
        removeAll,
        reset,
        updateCurrentProperties,
    };
};
