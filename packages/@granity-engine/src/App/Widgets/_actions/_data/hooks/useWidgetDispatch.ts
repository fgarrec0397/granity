import { useAppDispatch } from "@granity/engine/App/Core/_actions/_data/state/store";
import { useCallback } from "react";

import { WidgetObjectInfo, WidgetObjectInfoDictionary, WidgetProperties } from "../../widgetsTypes";
import { setPropertiesUI } from "../state/displayedInformationReducer";
import {
    addBatchWidgetDictionary,
    addWidgetDictionary,
    overrideWidgetDictionary,
    removeBatchWidgetDictionary,
    removeWidgetDictionary,
    updateWidgetDictionary,
} from "../state/widgetsInfoDictionaryReducer";
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

    const dispatchSetPropertiesUI = useCallback(
        (widgetProperties: WidgetProperties) => {
            return dispatch(setPropertiesUI(widgetProperties));
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
        dispatchSetPropertiesUI,
    };
};
