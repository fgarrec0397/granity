import { useAppDispatch } from "@core/store";
import { useCallback } from "react";

import { WidgetProperties, WidgetsDictionary, WidgetsDictionaryItem } from "../../widgetsTypes";
import {
    addBatchWidgetDictionary,
    addWidgetDictionary,
    overrideWidgetDictionary,
    removeBatchWidgetDictionary,
    removeWidgetDictionary,
    setCurrentWidgetProperties,
    updateWidgetDictionary,
} from "../state/widgetsReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAddDictionary = (widgetsDictionaryItem: Required<WidgetsDictionaryItem>) => {
        return dispatch(addWidgetDictionary(widgetsDictionaryItem));
    };

    const dispatchAddBatchDictionary = useCallback(
        (widgetsDictionary: Required<WidgetsDictionary>) => {
            return dispatch(addBatchWidgetDictionary(widgetsDictionary));
        },
        [dispatch]
    );

    const dispatchUpdateDictionary = useCallback(
        (widgetsDictionaryItem: WidgetsDictionaryItem) => {
            return dispatch(updateWidgetDictionary(widgetsDictionaryItem));
        },
        [dispatch]
    );

    const dispatchRemoveWidgetDictionary = (widgetId: string | undefined) => {
        if (widgetId) {
            return dispatch(removeWidgetDictionary(widgetId));
        }
    };

    const dispatchRemoveBatchWidgetDictionary = (widgetIds: string[]) => {
        return dispatch(removeBatchWidgetDictionary(widgetIds));
    };

    const dispatchOverrideWidgetDictionary = (widgetDictionary: WidgetsDictionary) => {
        return dispatch(overrideWidgetDictionary(widgetDictionary));
    };

    const dispatchSetCurrentWidgetProperties = (widgetProperties: WidgetProperties) => {
        return dispatch(setCurrentWidgetProperties(widgetProperties));
    };

    return {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
        dispatchOverrideWidgetDictionary,
        dispatchSetCurrentWidgetProperties,
    };
};
