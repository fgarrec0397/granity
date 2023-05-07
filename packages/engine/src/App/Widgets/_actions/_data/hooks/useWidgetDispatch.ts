import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";
import { useCallback } from "react";

import { WidgetObjectInfo, WidgetObjectInfoDictionary } from "../../widgetsTypes";
import {
    addBatchWidgetDictionary,
    addWidgetDictionary,
    overrideWidgetDictionary,
    removeBatchWidgetDictionary,
    removeWidgetDictionary,
    updateWidgetDictionary,
} from "../state/widgetsReducer";
import { UpdateWidgetParameter } from "../widgetsServiceParameters";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAddDictionary = useCallback(
        (widgetObjectInfo: Required<WidgetObjectInfo>) => {
            return dispatch(addWidgetDictionary(widgetObjectInfo));
        },
        [dispatch]
    );

    const dispatchAddBatchDictionary = useCallback(
        (widgetsObjectInfoDictionary: Required<WidgetObjectInfoDictionary>) => {
            return dispatch(addBatchWidgetDictionary(widgetsObjectInfoDictionary));
        },
        [dispatch]
    );

    const dispatchUpdateDictionary = useCallback(
        <TValue = string>(widgetId: string, value: UpdateWidgetParameter<TValue>) => {
            return dispatch(updateWidgetDictionary({ widgetId, value }));
        },
        [dispatch]
    );

    const dispatchRemoveWidgetDictionary = useCallback(
        (widgetId: string | undefined) => {
            if (widgetId) {
                return dispatch(removeWidgetDictionary(widgetId));
            }
        },
        [dispatch]
    );

    const dispatchRemoveBatchWidgetDictionary = useCallback(
        (widgetIds: string[]) => {
            return dispatch(removeBatchWidgetDictionary(widgetIds));
        },
        [dispatch]
    );

    const dispatchOverrideWidgetDictionary = useCallback(
        (widgetDictionary: WidgetObjectInfoDictionary) => {
            return dispatch(overrideWidgetDictionary(widgetDictionary));
        },
        [dispatch]
    );

    return {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveWidgetDictionary,
        dispatchRemoveBatchWidgetDictionary,
        dispatchOverrideWidgetDictionary,
    };
};
