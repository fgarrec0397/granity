import { WidgetOptionsValues, WidgetProperties, WidgetSceneObject } from "../../../types";
import useWidgetDispatch from "./useWidgetDispatch";
import useWidgetsContext from "./useWidgetsContext";

export default () => {
    const { widgets, setWidgets } = useWidgetsContext();
    const { dispatchAddDictionary, dispatchUpdateDictionary, dispatchSetCurrentWidgetProperties } =
        useWidgetDispatch();

    const add = (
        newWidget: WidgetSceneObject,
        properties: WidgetProperties,
        options: WidgetOptionsValues
    ) => {
        if (newWidget.id) {
            dispatchAddDictionary({
                id: newWidget.id,
                properties,
                options,
            });
        }

        setWidgets([...widgets, newWidget]);
    };

    const update = (
        widget: WidgetSceneObject,
        widgetProperties?: WidgetProperties,
        widgetOptions?: WidgetOptionsValues
    ) => {
        if (widget.id) {
            dispatchUpdateDictionary({
                id: widget.id,
                options: widgetOptions,
                properties: widgetProperties,
            });
        }
    };

    const updateCurrentProperties = (widgetProperties: WidgetProperties) => {
        dispatchSetCurrentWidgetProperties(widgetProperties);
    };

    // - Remove

    return {
        add,
        update,
        updateCurrentProperties,
    };
};
