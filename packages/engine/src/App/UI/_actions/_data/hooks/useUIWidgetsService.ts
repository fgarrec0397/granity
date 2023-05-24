import { pull } from "@granity/helpers";
import { useCallback } from "react";

import {
    UIWidgetDictionary,
    UIWidgetDictionaryItem,
    UIWidgetInfoDictionary,
    UIWidgetInfoDictionaryItem,
} from "../../uiTypes";
// import { UpdateWidgetParameter } from "../widgetsServiceParameters";
import useUIWidgetsContext from "./useUIWidgetsContext";

export default () => {
    const {
        uiWidgets,
        selectedWidgets,
        setWidgets,
        setSelectedWidgets,
        uiWidgetsIds,
        setWidgetsIds,
    } = useUIWidgetsContext();

    const add = useCallback(
        (newWidget: UIWidgetDictionaryItem, newWidgetInfo?: UIWidgetInfoDictionaryItem) => {
            // if (newWidgetInfo) {
            //     const requiredWidgetDictionaryItem =
            //         newWidgetInfo as Required<UIWidgetInfoDictionaryItem>;
            //     dispatchAddWidgetInfoDictionaryItem(requiredWidgetDictionaryItem);
            // }

            setWidgets((prevWidgets) => ({
                ...prevWidgets,
                [newWidget.id]: { ...newWidget },
            }));

            setWidgetsIds((prevIds) => [...prevIds, newWidget.id]);
        },
        [setWidgets, setWidgetsIds]
    );

    const addBatch = useCallback(
        (newWidgets: UIWidgetDictionary, newWidgetsInfoDictionary: UIWidgetInfoDictionary) => {
            // dispatchAddBatchWidgetInfoDictionary(newWidgetsInfoDictionary);
            setWidgets((prevWidgets) => ({ ...prevWidgets, ...newWidgets }));
            setWidgetsIds((prevIds) => [...prevIds, ...Object.keys(newWidgets)]);
        },
        [setWidgets, setWidgetsIds]
    );

    // const update = useCallback(
    //     <TValue = string>(widgetId: string, value: UpdateWidgetParameter<TValue>) => {
    //         dispatchUpdateWidgetInfoDictionaryItem(widgetId, value);
    //     },
    //     [dispatchUpdateWidgetInfoDictionaryItem]
    // );

    const select = useCallback(
        (widgetsToSelect: UIWidgetDictionaryItem[]) => {
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
            // dispatchRemoveWidgetInfoDictionary(widgetId);

            delete uiWidgets[widgetId];

            setWidgetsIds((prevIds) => {
                const ids = prevIds.filter((x) => x !== widgetId);

                return ids;
            });
        },
        [removeSelection, setWidgetsIds, uiWidgets]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: UIWidgetDictionary) => {
            const widgetsIdsToDelete = Object.keys(widgetsToDelete);

            removeSelection();
            // dispatchRemoveBatchWidgetInfoDictionary(widgetsIdsToDelete);

            Object.keys(widgetsToDelete).forEach((x) => delete uiWidgets[x]);

            setWidgetsIds((prevIds) => {
                const ids = pull(prevIds, ...Object.keys(widgetsToDelete));

                return ids;
            });
        },
        [removeSelection, setWidgetsIds, uiWidgets]
    );

    const removeAll = useCallback(() => {
        removeBatch(uiWidgets);
    }, [removeBatch, uiWidgets]);

    const reset = useCallback(
        (
            newWidgets: UIWidgetDictionary,
            newWidgetsDictionary: UIWidgetInfoDictionary,
            shouldRemoveAll?: boolean
        ) => {
            if (shouldRemoveAll) {
                removeAll();
            }

            setWidgets(newWidgets);
            setWidgetsIds(Object.keys(newWidgets));
            // dispatchOverrideWidgetInfoDictionary(newWidgetsDictionary);
        },
        [removeAll, setWidgets, setWidgetsIds]
    );

    return {
        add,
        addBatch,
        // update,
        select,
        uiWidgets,
        uiWidgetsIds,
        // uiWidgetsInfoDictionary,
        // uiWidgetsObjectInfoIds,
        selectedWidgets,
        removeSelection,
        remove,
        removeBatch,
        removeAll,
        reset,
    };
};
