import { Object3D } from "three";
import widgetsCollection from "../../Features/collector";
import constants from "../Core/constants";
import { WidgetModule, WidgetSceneObject } from "./types";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export const mapIWidgetToWidgetSceneObject = (widget: WidgetModule) => {
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

export const getWidgetName = (widget: WidgetModule | WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
