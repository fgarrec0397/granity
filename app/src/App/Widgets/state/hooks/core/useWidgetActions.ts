import { WidgetOptionsValues, WidgetProperties, WidgetSceneObject } from "../../../types";
import useWidgetDispatch from "./useWidgetDispatch";
import useSceneWidgetsContext from "./useSceneWidgetsContext";

export default () => {
    const { widgets, setSceneWidgets } = useSceneWidgetsContext();
    const {
        dispatchAddDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveSelected,
        dispatchSetCurrentWidgetProperties,
    } = useWidgetDispatch();

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

    const remove = (widget: WidgetSceneObject) => {
        const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);
        setSceneWidgets([...updatedWidgets]);
        dispatchRemoveWidgetDictionary(widget.id);
        dispatchRemoveSelected();
    };

    const updateCurrentProperties = (widgetProperties: WidgetProperties) => {
        dispatchSetCurrentWidgetProperties(widgetProperties);
    };

    // - Remove

    return {
        add,
        update,
        remove,
        updateCurrentProperties,
    };
};
function dispatchRemoveWidgetDictionary(id: string | undefined) {
    throw new Error("Function not implemented.");
}
