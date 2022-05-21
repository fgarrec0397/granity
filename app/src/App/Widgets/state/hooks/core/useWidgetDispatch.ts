import { useDispatch } from "react-redux";
import { WidgetProperties, WidgetsDictionaryItem } from "../../../types";
import {
    addWidgetDictionary,
    removeSelected,
    removeWidgetDictionary,
    setCurrentWidgetProperties,
    updateWidgetDictionary,
} from "../../widgetsReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddDictionary = (widgetsDictionaryItem: Required<WidgetsDictionaryItem>) => {
        return dispatch(addWidgetDictionary(widgetsDictionaryItem));
    };

    const dispatchUpdateDictionary = (widgetsDictionaryItem: WidgetsDictionaryItem) => {
        return dispatch(updateWidgetDictionary(widgetsDictionaryItem));
    };

    const dispatchRemoveWidgetDictionary = (widgetId: string) => {
        return dispatch(removeWidgetDictionary(widgetId));
    };

    const dispatchRemoveSelected = () => {
        return dispatch(removeSelected());
    };

    const dispatchSetCurrentWidgetProperties = (widgetProperties: WidgetProperties) => {
        return dispatch(setCurrentWidgetProperties(widgetProperties));
    };

    return {
        dispatchAddDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveWidgetDictionary,
        dispatchRemoveSelected,
        dispatchSetCurrentWidgetProperties,
    };
};
