import { pull } from "@granity/helpers";
import { useCallback, useMemo } from "react";

import filterWidgets from "../../utilities/filterWidgets";
import filterWidgetsIds from "../../utilities/filterWidgetsIds";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectInfo,
    WidgetObjectInfoDictionary,
    WidgetObjectsDictionaryItem,
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
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveWidgetDictionary,
        dispatchOverrideWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
    } = useWidgetDispatch();

    const { widgetsObjects, widgetsUI } = useMemo(() => filterWidgets(widgets), [widgets]);

    const { widgetsObjectsIds, widgetsUIIds } = useMemo(
        () => filterWidgetsIds(widgets, widgetsIds),
        [widgets, widgetsIds]
    );

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

            setWidgetsIds((prevIds) => [...prevIds, newWidget.id]);
        },
        [dispatchAddDictionary, setWidgets, setWidgetsIds]
    );

    const addBatch = useCallback(
        (newWidgets: WidgetDictionary, newWidgetsDictionary: WidgetObjectInfoDictionary) => {
            dispatchAddBatchDictionary(newWidgetsDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
            setWidgetsIds((prevIds) => [...prevIds, ...Object.keys(newWidgets)]);
        },
        [dispatchAddBatchDictionary, setWidgets, setWidgetsIds]
    );

    const update = useCallback(
        <TValue = string>(widgetId: string, value: UpdateWidgetParameter<TValue>) => {
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

            setWidgetsIds((prevIds) => {
                const ids = prevIds.filter((x) => x !== widgetId);

                return ids;
            });
        },
        [dispatchRemoveWidgetDictionary, removeSelection, setWidgetsIds, widgets]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetDictionary) => {
            const widgetsIdsToDelete = Object.keys(widgetsToDelete);

            removeSelection();
            dispatchRemoveBatchWidgetDictionary(widgetsIdsToDelete);

            Object.keys(widgetsToDelete).forEach((x) => delete widgets[x]);

            setWidgetsIds((prevIds) => {
                const ids = pull(prevIds, ...Object.keys(widgetsToDelete));

                return ids;
            });
        },
        [dispatchRemoveBatchWidgetDictionary, removeSelection, setWidgetsIds, widgets]
    );

    const removeAll = useCallback(() => {
        removeBatch(widgets);
    }, [removeBatch, widgets]);

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
            setWidgetsIds(Object.keys(newWidgets));
            dispatchOverrideWidgetDictionary(newWidgetsDictionary);
        },
        [dispatchOverrideWidgetDictionary, removeAll, setWidgets, setWidgetsIds]
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
