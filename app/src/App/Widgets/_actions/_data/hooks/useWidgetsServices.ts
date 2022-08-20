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

    const remove = (widget: WidgetSceneObject) => {
        removeSelection();
        dispatchRemoveWidgetDictionary(widget.id);

        delete widgets[widget.id];
    };

    const updateCurrentProperties = (widgetProperties: WidgetProperties) => {
        dispatchSetCurrentWidgetProperties(widgetProperties);
    };

    return {
        add,
        addBatch,
        update,
        select,
        removeSelection,
        remove,
        updateCurrentProperties,
    };
};
