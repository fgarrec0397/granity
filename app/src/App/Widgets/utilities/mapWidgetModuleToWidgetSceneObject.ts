import { WidgetModule, WidgetSceneObject } from "../types";

export default (widget: WidgetModule) => {
    const widgetSceneObject: WidgetSceneObject = {
        id: widget.id,
        component: widget.component,
        widgetDefinition: widget.widgetDefinition,
        editorOptions: widget.editorOptions,
    };

    return widgetSceneObject;
};
