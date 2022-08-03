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
    const { widgets, setWidgets } = useWidgetsContext();
    const {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveSelected,
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

    const remove = (widget: WidgetSceneObject) => {
        delete widgets[widget.id];
        // setWidgets([...updatedWidgets]); // TODO -- Validate this still works after thte refactoring
        dispatchRemoveWidgetDictionary(widget.id);
        dispatchRemoveSelected();
    };

    const updateCurrentProperties = (widgetProperties: WidgetProperties) => {
        dispatchSetCurrentWidgetProperties(widgetProperties);
    };

    return {
        add,
        addBatch,
        update,
        remove,
        updateCurrentProperties,
    };
};
