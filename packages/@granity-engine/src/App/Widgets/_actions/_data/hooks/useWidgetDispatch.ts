import { useAppDispatch } from "@granity-engine/App/Core/_actions/_data/state/store";
import { useCallback } from "react";

import { WidgetObjectInfo, WidgetObjectInfoDictionary, WidgetProperties } from "../../widgetsTypes";
import { setCurrentWidgetProperties } from "../state/displayedInformationReducer";
import {
    addBatchWidgetDictionary,
    addWidgetDictionary,
    overrideWidgetDictionary,
    removeBatchWidgetDictionary,
    removeWidgetDictionary,
    updateWidgetDictionaryV2,
} from "../state/widgetsInfoDictionaryReducer";

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
        (widgetId: string, value: Omit<WidgetObjectInfo, "id">) => {
            return dispatch(updateWidgetDictionaryV2({ widgetId, value }));
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

    const dispatchSetCurrentWidgetProperties = useCallback(
        (widgetProperties: WidgetProperties) => {
            return dispatch(setCurrentWidgetProperties(widgetProperties));
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
        dispatchSetCurrentWidgetProperties,
    };
};
