import { WidgetOptionsValues, WidgetProperties, WidgetSceneObject } from "../../../types";
import useWidgetDispatch from "./useWidgetDispatch";
import useSceneWidgetsContext from "./useSceneWidgetsContext";

export default () => {
    const { widgets, setSceneWidgets } = useSceneWidgetsContext();
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

        setSceneWidgets([...widgets, newWidget]);
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
