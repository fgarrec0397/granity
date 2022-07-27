import { WidgetModule, WidgetSceneObject } from "../widgetsTypes";

export default (widget: WidgetModule) => {
    const widgetSceneObject: WidgetSceneObject = {
        id: "",
        component: widget.component,
        widgetDefinition: widget.widgetDefinition,
        editorOptions: widget.editorOptions,
    };

    return widgetSceneObject;
};
