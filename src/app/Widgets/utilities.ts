import { IWidget, WidgetProperties, WidgetSceneObject } from "./types";
import widgetsCollection from "../../Features/collector";

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

export const getWidgetComponent = (name: string) => {
    return widgetsCollection.find((x) => x.widgetDefinition.name === name)?.component;
};
