import { useDispatch } from "react-redux";
import { WidgetProperties, WidgetsDictionaryItem } from "../../../types";
import {
    addWidgetDictionary,
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

    const dispatchSetCurrentWidgetProperties = (widgetProperties: WidgetProperties) => {
        return dispatch(setCurrentWidgetProperties(widgetProperties));
    };

    return { dispatchAddDictionary, dispatchUpdateDictionary, dispatchSetCurrentWidgetProperties };
};
