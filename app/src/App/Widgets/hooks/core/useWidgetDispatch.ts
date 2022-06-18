import { useDispatch } from "react-redux";
import {
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
    WidgetsDictionaryItem,
} from "@app/Widgets/widgetsTypes";
import {
    addBatchWidgetDictionary,
    addWidgetDictionary,
    removeSelected,
    removeWidgetDictionary,
    setCurrentWidgetProperties,
    setSelected,
    updateWidgetDictionary,
} from "@widgets/state/widgetsReducer";
import { useCallback } from "react";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddDictionary = (widgetsDictionaryItem: Required<WidgetsDictionaryItem>) => {
        return dispatch(addWidgetDictionary(widgetsDictionaryItem));
    };

    const dispatchAddBatchDictionary = useCallback(
        (widgetsDictionary: Required<WidgetsDictionary>) => {
            return dispatch(addBatchWidgetDictionary(widgetsDictionary));
        },
        [dispatch]
    );

    const dispatchSetSelected = (widget: WidgetSceneObject) => {
        if (widget.id) {
            return dispatch(setSelected({ newSelectedId: widget.id }));
        }
    };

    const dispatchUpdateDictionary = (widgetsDictionaryItem: WidgetsDictionaryItem) => {
        return dispatch(updateWidgetDictionary(widgetsDictionaryItem));
    };

    const dispatchRemoveWidgetDictionary = (widgetId: string | undefined) => {
        if (widgetId) {
            return dispatch(removeWidgetDictionary(widgetId));
        }
    };

    const dispatchRemoveSelected = () => {
        return dispatch(removeSelected());
    };

    const dispatchSetCurrentWidgetProperties = (widgetProperties: WidgetProperties) => {
        return dispatch(setCurrentWidgetProperties(widgetProperties));
    };

    return {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchSetSelected,
        dispatchUpdateDictionary,
        dispatchRemoveWidgetDictionary,
        dispatchRemoveSelected,
        dispatchSetCurrentWidgetProperties,
    };
};
