import { IWidget, SerializedWidgetSceneObject, WidgetProperties, WidgetSceneObject } from "./types";
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

export const serializeSceneWidget = (widget: WidgetSceneObject) => {
    const serializedWidget: SerializedWidgetSceneObject = {
        id: widget.id,
        widgetDefinition: widget.widgetDefinition,
        properties: widget.properties,
    };

    return serializedWidget;
};

export const unSerializeSceneWidget = (serializedWidget: SerializedWidgetSceneObject) => {
    const widgetComponent = getWidgetComponent(serializedWidget.widgetDefinition.name);

    if (widgetComponent) {
        const unSerializedWidget: WidgetSceneObject = {
            id: serializedWidget.id,
            component: widgetComponent,
            widgetDefinition: serializedWidget.widgetDefinition,
            properties: serializedWidget.properties,
        };

        return unSerializedWidget;
    }
};

export const getWidgetComponent = (name: string) => {
    return widgetsCollection.find((x) => x.widgetDefinition.name === name)?.component;
};
