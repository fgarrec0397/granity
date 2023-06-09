import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";
import { useCallback } from "react";

import {
    WidgetInfoDictionary,
    WidgetInfoDictionaryItem,
    WidgetInfoValueParameter,
} from "../../widgetsTypes";
import {
    addBatchWidgetInfoDictionary,
    addWidgetInfoDictionaryItem,
    overrideWidgetInfoDictionary,
    removeBatchWidgetInfoDictionary,
    removeWidgetInfoDictionaryItem,
    updateWidgetInfoDictionaryItem,
} from "../state/widgetsInfoReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAddWidgetInfoDictionaryItem = useCallback(
        <WidgetInfoDictionaryItemType extends WidgetInfoDictionaryItem>(
            widgetInfoDictionaryItem: Required<WidgetInfoDictionaryItemType>
        ) => {
            return dispatch(addWidgetInfoDictionaryItem(widgetInfoDictionaryItem));
        },
        [dispatch]
    );

    const dispatchAddBatchWidgetInfoDictionary = useCallback(
        (widgetsInfoDictionary: Required<WidgetInfoDictionary>) => {
            return dispatch(addBatchWidgetInfoDictionary(widgetsInfoDictionary));
        },
        [dispatch]
    );

    const dispatchUpdateWidgetInfoDictionaryItem = useCallback(
        <Value extends WidgetInfoValueParameter>(widgetId: string, value: Value) => {
            return dispatch(updateWidgetInfoDictionaryItem({ widgetId, value }));
        },
        [dispatch]
    );

    const dispatchRemoveWidgetInfoDictionary = useCallback(
        (widgetId: string | undefined) => {
            if (widgetId) {
                return dispatch(removeWidgetInfoDictionaryItem(widgetId));
            }
        },
        [dispatch]
    );

    const dispatchRemoveBatchWidgetInfoDictionary = useCallback(
        (widgetIds: string[]) => {
            return dispatch(removeBatchWidgetInfoDictionary(widgetIds));
        },
        [dispatch]
    );

    const dispatchOverrideWidgetInfoDictionary = useCallback(
        (widgetDictionary: WidgetInfoDictionary) => {
            return dispatch(overrideWidgetInfoDictionary(widgetDictionary));
        },
        [dispatch]
    );

    return {
        dispatchAddWidgetInfoDictionaryItem,
        dispatchAddBatchWidgetInfoDictionary,
        dispatchUpdateWidgetInfoDictionaryItem,
        dispatchRemoveWidgetInfoDictionary,
        dispatchRemoveBatchWidgetInfoDictionary,
        dispatchOverrideWidgetInfoDictionary,
    };
};
