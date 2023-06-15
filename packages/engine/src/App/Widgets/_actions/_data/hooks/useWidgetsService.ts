import { clone, pull, recursiveRemoveArrayOfObjects } from "@granity/helpers";
import { useCallback } from "react";

import widgetsIdsMapper from "../../mappers/widgetsIdsMapper";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetInfoValueParameter,
    WidgetsIds,
    WidgetValueParameter,
} from "../../widgetsTypes";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";
import useWidgetsSelector from "./useWidgetsSelector";

export default () => {
    const { widgetsInfoDictionary, widgetsObjectInfoIds } = useWidgetsSelector();
    const { widgets, selectedWidgets, setWidgets, setSelectedWidgets, widgetsIds, setWidgetsIds } =
        useWidgetsContext();
    const {
        dispatchAddWidgetInfoDictionaryItem,
        dispatchAddBatchWidgetInfoDictionary,
        dispatchUpdateWidgetInfoDictionaryItem,
        dispatchRemoveWidgetInfoDictionary,
        dispatchOverrideWidgetInfoDictionary,
        dispatchRemoveBatchWidgetInfoDictionary,
    } = useWidgetDispatch();

    const updateWidgetsIds = useCallback(
        (newWidgetsIds: WidgetsIds) => {
            setWidgetsIds(newWidgetsIds);
        },
        [setWidgetsIds]
    );

    const add = useCallback(
        <
            WidgetDictionaryItemType extends WidgetDictionaryItem,
            WidgetInfoDictionaryItemType extends WidgetInfoDictionaryItem
        >(
            newWidget: WidgetDictionaryItemType,
            newWidgetInfo?: WidgetInfoDictionaryItemType
        ) => {
            if (newWidgetInfo) {
                const requiredWidgetDictionaryItem =
                    newWidgetInfo as Required<WidgetInfoDictionaryItemType>;
                dispatchAddWidgetInfoDictionaryItem(requiredWidgetDictionaryItem);
            }

            setWidgets((prevWidgets) => ({
                ...prevWidgets,
                [newWidget.id]: { ...newWidget },
            }));

            updateWidgetsIds([
                ...widgetsIds,
                {
                    id: newWidget.id,
                    path: widgetsIds.length.toString(),
                    children: [],
                },
            ]);
        },
        [dispatchAddWidgetInfoDictionaryItem, setWidgets, updateWidgetsIds, widgetsIds]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetDictionary, newWidgetsInfoDictionary: WidgetInfoDictionary) => {
            dispatchAddBatchWidgetInfoDictionary(newWidgetsInfoDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
            updateWidgetsIds([...widgetsIds, ...widgetsIdsMapper(newWidgets)]);
        },
        [dispatchAddBatchWidgetInfoDictionary, setWidgets, updateWidgetsIds, widgetsIds]
    );

    const updateInfo = useCallback(
        <Value extends WidgetInfoValueParameter>(widgetId: string, value: Value) => {
            dispatchUpdateWidgetInfoDictionaryItem(widgetId, value);
        },
        [dispatchUpdateWidgetInfoDictionaryItem]
    );

    const update = useCallback(
        <Value extends WidgetValueParameter>(widgetId: string, value: Value) => {
            setWidgets((prevWidgets) => {
                const clonedPrevWidgets = clone(prevWidgets);

                clonedPrevWidgets[widgetId] = {
                    ...clonedPrevWidgets[widgetId],
                    ...value,
                };

                return clonedPrevWidgets;
            });
        },
        [setWidgets]
    );

    const select = useCallback(
        (widgetsToSelect: WidgetDictionaryItem[]) => {
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
            dispatchRemoveWidgetInfoDictionary(widgetId);

            delete widgets[widgetId];

            setWidgetsIds((prevWidgetsIds) => {
                const newWidgetsIds = recursiveRemoveArrayOfObjects(prevWidgetsIds, widgetId);
                return newWidgetsIds;
            });
        },
        [dispatchRemoveWidgetInfoDictionary, removeSelection, setWidgetsIds, widgets]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetDictionary) => {
            const widgetsIdsToDelete = Object.keys(widgetsToDelete);

            removeSelection();
            dispatchRemoveBatchWidgetInfoDictionary(widgetsIdsToDelete);

            Object.keys(widgetsToDelete).forEach((x) => delete widgets[x]);

            setWidgetsIds((prevIds) => {
                const ids = pull(prevIds, ...widgetsIdsMapper(widgetsToDelete));

                return ids;
            });
        },
        [dispatchRemoveBatchWidgetInfoDictionary, removeSelection, setWidgetsIds, widgets]
    );

    const removeAll = useCallback(() => {
        removeBatch(widgets);
    }, [removeBatch, widgets]);

    const reset = useCallback(
        (
            newWidgets: WidgetDictionary,
            newWidgetsDictionary: WidgetInfoDictionary,
            newWidgetsIds?: WidgetsIds,
            shouldRemoveAll?: boolean
        ) => {
            if (shouldRemoveAll) {
                removeAll();
            }

            setWidgets(newWidgets);
            setWidgetsIds(newWidgetsIds || widgetsIdsMapper(newWidgets));
            dispatchOverrideWidgetInfoDictionary(newWidgetsDictionary);
        },
        [dispatchOverrideWidgetInfoDictionary, removeAll, setWidgets, setWidgetsIds]
    );

    return {
        add,
        addBatch,
        update,
        updateInfo,
        updateWidgetsIds,
        select,
        widgets,
        widgetsIds,
        widgetsInfoDictionary,
        widgetsObjectInfoIds,
        selectedWidgets,
        removeSelection,
        remove,
        removeBatch,
        removeAll,
        reset,
    };
};
