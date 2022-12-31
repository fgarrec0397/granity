import { useAppDispatch } from "@app/Core/_actions/_data/state/store";
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
    updateWidgetDictionaryV2,
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

    const dispatchUpdateDictionaryV2 = useCallback(
        (widgetId: string, value: Omit<WidgetsInfoDictionaryItem, "id">) => {
            return dispatch(updateWidgetDictionaryV2({ widgetId, value }));
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
        dispatchUpdateDictionaryV2,
        dispatchRemoveWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
        dispatchOverrideWidgetDictionary,
        dispatchSetCurrentWidgetProperties,
    };
};
