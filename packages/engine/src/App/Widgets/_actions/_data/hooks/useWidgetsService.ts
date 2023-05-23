import { pull } from "@granity/helpers";
import { useCallback, useMemo } from "react";

import filterWidgets from "../../utilities/filterWidgets";
import filterWidgetsIds from "../../utilities/filterWidgetsIds";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
} from "../../widgetsTypes";
import { UpdateWidgetParameter } from "../widgetsServiceParameters";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";
import useWidgetsSelector from "./useWidgetsSelector";

export default () => {
    const { widgetsObjectInfoDictionary, widgetsObjectInfoIds } = useWidgetsSelector();
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

    const { widgetsObjects, widgetsUI } = useMemo(() => filterWidgets(widgets), [widgets]);

    const { widgetsObjectsIds, widgetsUIIds } = useMemo(
        () => filterWidgetsIds(widgets, widgetsIds),
        [widgets, widgetsIds]
    );

    const add = useCallback(
        (newWidget: WidgetDictionaryItem, newWidgetInfo?: WidgetInfoDictionaryItem) => {
            if (newWidgetInfo) {
                const requiredWidgetDictionaryItem =
                    newWidgetInfo as Required<WidgetInfoDictionaryItem>;
                dispatchAddWidgetInfoDictionaryItem(requiredWidgetDictionaryItem);
            }

            setWidgets((prevWidgets) => ({
                ...prevWidgets,
                [newWidget.id]: { ...newWidget },
            }));

            setWidgetsIds((prevIds) => [...prevIds, newWidget.id]);
        },
        [dispatchAddWidgetInfoDictionaryItem, setWidgets, setWidgetsIds]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetDictionary, newWidgetsInfoDictionary: WidgetInfoDictionary) => {
            dispatchAddBatchWidgetInfoDictionary(newWidgetsInfoDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
            setWidgetsIds((prevIds) => [...prevIds, ...Object.keys(newWidgets)]);
        },
        [dispatchAddBatchWidgetInfoDictionary, setWidgets, setWidgetsIds]
    );

    const update = useCallback(
        <TValue = string>(widgetId: string, value: UpdateWidgetParameter<TValue>) => {
            dispatchUpdateWidgetInfoDictionaryItem(widgetId, value);
        },
        [dispatchUpdateWidgetInfoDictionaryItem]
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

            setWidgetsIds((prevIds) => {
                const ids = prevIds.filter((x) => x !== widgetId);

                return ids;
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
                const ids = pull(prevIds, ...Object.keys(widgetsToDelete));

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
            shouldRemoveAll?: boolean
        ) => {
            if (shouldRemoveAll) {
                removeAll();
            }

            setWidgets(newWidgets);
            setWidgetsIds(Object.keys(newWidgets));
            dispatchOverrideWidgetInfoDictionary(newWidgetsDictionary);
        },
        [dispatchOverrideWidgetInfoDictionary, removeAll, setWidgets, setWidgetsIds]
    );

    return {
        add,
        addBatch,
        update,
        select,
        widgets,
        widgetsIds,
        widgetsObjects,
        widgetsUI,
        widgetsObjectsIds,
        widgetsUIIds,
        widgetsObjectInfoDictionary,
        widgetsObjectInfoIds,
        selectedWidgets,
        removeSelection,
        remove,
        removeBatch,
        removeAll,
        reset,
    };
};
