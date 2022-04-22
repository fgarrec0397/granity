import { IWidget, WidgetProperties, WidgetSceneObject } from "./types";

export const mapIWidgetToWidgetSceneObject = (
    widget: IWidget,
    widgetProperties: WidgetProperties
) => {
    const widgetSceneObject: WidgetSceneObject = {
        id: widget.id,
        component: widget.component,
        widgetDefinition: widget.widgetDefinition,
        properties: {
            ...widgetProperties,
        },
    };

    return widgetSceneObject;
};
