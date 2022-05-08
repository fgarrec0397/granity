import { Object3D } from "three";
import { IWidget, WidgetSceneObject } from "./types";
import widgetsCollection from "../../Features/collector";

export const mapIWidgetToWidgetSceneObject = (widget: IWidget) => {
    const widgetSceneObject: WidgetSceneObject = {
        id: widget.id,
        component: widget.component,
        widgetDefinition: widget.widgetDefinition,
    };

    return widgetSceneObject;
};

export const getWidgetIdFromName = (mesh: Object3D) => {
    return mesh.name.split("+")[2];
};

export const getWidgetComponent = (name: string) => {
    return widgetsCollection.find((x) => x.widgetDefinition.name === name)?.component;
};
