import { useDispatch } from "react-redux";
import { WidgetProperties, WidgetSceneObject, WidgetsDictionaryItem } from "../../../types";
import {
    addWidgetDictionary,
    removeSelected,
    removeWidgetDictionary,
    setCurrentWidgetProperties,
    setSelected,
    updateWidgetDictionary,
} from "../../widgetsReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddDictionary = (widgetsDictionaryItem: Required<WidgetsDictionaryItem>) => {
        return dispatch(addWidgetDictionary(widgetsDictionaryItem));
    };

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
        dispatchSetSelected,
        dispatchUpdateDictionary,
        dispatchRemoveWidgetDictionary,
        dispatchRemoveSelected,
        dispatchSetCurrentWidgetProperties,
    };
};
