import { clone, cloneDeep, pull, RecursiveArrayItem } from "@granity/helpers";
import { useCallback } from "react";

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
            updateWidgetsIds([...widgetsIds, ...Object.keys(newWidgets).map((x) => ({ id: x }))]);
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

            const myArray = [
                {
                    id: 1,
                    children: [
                        {
                            id: 3,
                            children: [],
                        },
                    ],
                },
                {
                    id: 2,
                    children: [],
                },
            ];

            // const myArray = [1, 2, [3, [4]]];

            function recursiveRemove(list, id) {
                return list
                    .map((item) => {
                        return { ...item };
                    })
                    .filter((item) => {
                        if ("children" in item) {
                            item.children = recursiveRemove(item.children, id);
                        }
                        return item.id !== id;
                    });
            }
            const test1 = recursiveRemove(widgetsIds, widgetId);
            const test2 = recursiveRemove(myArray, 2);
            const test3 = recursiveRemove(myArray, 3);

            console.log(myArray, "myArray");

            console.log({ test1, test2, test3 });

            // const recursiveRemove = (ids: WidgetsIds, id: string): WidgetsIds => {
            //     const clonedIds = cloneDeep(ids);
            //     // clonedIds = [1,2,3,[4, [5,6,7]]]

            //     return clonedIds.filter((item) => {
            //         if (typeof item !== "string") {
            //             console.log(item, "item is an array");

            //             item = recursiveRemove(item, id);
            //         }
            //         return item !== id;
            //     });
            // };
            // const recursiveRemove = (
            //     ids: WidgetsIds,
            //     id: string,
            //     isRecursive?: boolean
            // ): WidgetsIds => {
            //     const clonedIds = cloneDeep(ids);
            //     let filteredIds = [...clonedIds];
            //     if (isRecursive) {
            //         console.log("Recusive call");
            //     }

            //     console.log(filteredIds, "filteredIds");

            //     // clonedIds = [[4, [5]]]

            //     for (let index = 0; index < clonedIds.length; index++) {
            //         const item = clonedIds[index];
            //         if (typeof item !== "string") {
            //             console.log(item, "item is an array");

            //             if (item[0] === id) {
            //                 delete filteredIds[index];
            //                 break;
            //             }

            //             console.log(
            //                 recursiveRemove(item[1], id, true),
            //                 "value from recursiveRemove"
            //             );

            //             filteredIds = [...filteredIds, ...recursiveRemove(item[1], id, true)];
            //         }

            //         if (item === id) {
            //             console.log({ item, id });

            //             console.log(filteredIds[index], "filteredIds[index] before delete");
            //             // delete filteredIds[index];
            //             filteredIds.splice(index, 1);
            //             console.log(filteredIds, "filteredIds after delete");
            //         }
            //     }

            //     console.log(filteredIds, "filteredIds");

            //     return filteredIds;
            // };

            // const recursivelyDeleteId = (ids: WidgetsIds): WidgetsIds => {
            //     const clonedIds = [...ids];

            //     console.log(clonedIds, "clonedIds");

            //     const filteredIds = clonedIds
            //         .map((x) => x)
            //         .filter((x) => {
            //             if (typeof x === "string") {
            //                 console.log({ currentId: x, widgetId }, "currentId is type of string");

            //                 return x !== widgetId;
            //             } else {
            //                 console.log(x, "currentId is type of array");
            //                 console.log(x[0] === widgetId);

            //                 // if (x[0] !== widgetId) {
            //                 //     console.log("currentId is not widgetId, so we return true");

            //                 //     return true;
            //                 // }

            //                 recursivelyDeleteId(x);
            //             }
            //         });

            //     return filteredIds;
            // };

            // const newIds = recursiveRemove(widgetsIds, widgetId);
            // console.log(newIds, "newIds");

            setWidgetsIds(test1);
        },
        [dispatchRemoveWidgetInfoDictionary, removeSelection, setWidgetsIds, widgets, widgetsIds]
    );

    const removeBatch = useCallback(
        (widgetsToDelete: WidgetDictionary) => {
            const widgetsIdsToDelete = Object.keys(widgetsToDelete);

            removeSelection();
            dispatchRemoveBatchWidgetInfoDictionary(widgetsIdsToDelete);

            Object.keys(widgetsToDelete).forEach((x) => delete widgets[x]);

            setWidgetsIds((prevIds) => {
                const ids = pull(prevIds, ...Object.keys(widgetsToDelete).map((x) => ({ id: x })));

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
            setWidgetsIds(newWidgetsIds || Object.keys(newWidgets).map((x) => ({ id: x })));
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
