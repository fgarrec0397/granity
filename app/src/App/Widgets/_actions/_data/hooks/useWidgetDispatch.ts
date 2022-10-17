import { useAppDispatch } from "@app/Core/store";
import { useCallback } from "react";

import {
    WidgetProperties,
    WidgetsInfoDictionary,
    WidgetsInfoDictionaryItem,
} from "../../widgetsTypes";
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

    const dispatchAddDictionary = (
        widgetsInfoDictionaryItem: Required<WidgetsInfoDictionaryItem>
    ) => {
        return dispatch(addWidgetDictionary(widgetsInfoDictionaryItem));
    };

    const dispatchAddBatchDictionary = useCallback(
        (widgetsInfoDictionary: Required<WidgetsInfoDictionary>) => {
            return dispatch(addBatchWidgetDictionary(widgetsInfoDictionary));
        },
        [dispatch]
    );

    const dispatchUpdateDictionary = useCallback(
        (widgetsInfoDictionaryItem: WidgetsInfoDictionaryItem) => {
            return dispatch(updateWidgetDictionary(widgetsInfoDictionaryItem));
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

    const dispatchOverrideWidgetDictionary = (widgetDictionary: WidgetsInfoDictionary) => {
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
