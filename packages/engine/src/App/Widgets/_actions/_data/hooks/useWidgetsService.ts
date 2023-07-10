import { IdsArray } from "@engine/App/Core/_actions/coreTypes";
import { clone, pull, recursiveArrayRemoveitem } from "@granity/helpers";
import { useCallback } from "react";

import widgetsIdsMapper from "../../mappers/widgetsIdsMapper";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetId,
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetInfoValueParameter,
    WidgetsIds,
    WidgetValueParameter,
} from "../../widgetsTypes";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";
import useWidgetsSelector from "./useWidgetsSelector";

type RemoveBatchOptions = {
    parentWidgetId?: string;
};

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

    const flatRecursiveIds = useCallback(
        <ArrayType extends IdsArray = IdsArray>(array?: ArrayType): string[] => {
            if (!array?.length) {
                return [];
            }

            return array.reduce<string[]>((previous, current) => {
                const newArray = previous;

                newArray.push(current.id, ...flatRecursiveIds(current.children));

                return newArray;
            }, []);
        },
        []
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetDictionary | string[], options?: RemoveBatchOptions) => {
            let idsToRemove: string[];

            if (Array.isArray(widgetsToDelete)) {
                idsToRemove = widgetsToDelete;
            } else {
                idsToRemove = Object.keys(widgetsToDelete);
            }

            removeSelection();
            dispatchRemoveBatchWidgetInfoDictionary(idsToRemove);

            idsToRemove.forEach((x) => delete widgets[x]);

            if (options?.parentWidgetId) {
                setWidgetsIds((prevWidgetsIds) => {
                    const newWidgetsIds = recursiveArrayRemoveitem(
                        prevWidgetsIds,
                        options.parentWidgetId
                    );
                    return newWidgetsIds;
                });

                return;
            }

            setWidgetsIds((prevIds) => {
                const ids = pull(prevIds, ...widgetsIdsMapper(widgetsToDelete));

                return ids;
            });
        },
        [dispatchRemoveBatchWidgetInfoDictionary, removeSelection, setWidgetsIds, widgets]
    );

    const remove = useCallback(
        (widgetId: WidgetId | string) => {
            removeSelection();

            if (typeof widgetId !== "string" && widgetId.children?.length) {
                const idsToDelete = [widgetId.id, ...flatRecursiveIds(widgetId.children)];

                return removeBatch(idsToDelete, {
                    parentWidgetId: widgetId.id,
                });
            }

            const widgetIdToDelete = typeof widgetId === "string" ? widgetId : widgetId.id;

            dispatchRemoveWidgetInfoDictionary(widgetIdToDelete);
            delete widgets[widgetIdToDelete];

            setWidgetsIds((prevWidgetsIds) => {
                const newWidgetsIds = recursiveArrayRemoveitem(prevWidgetsIds, widgetIdToDelete);
                return newWidgetsIds;
            });
        },
        [
            dispatchRemoveWidgetInfoDictionary,
            flatRecursiveIds,
            removeBatch,
            removeSelection,
            setWidgetsIds,
            widgets,
        ]
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
