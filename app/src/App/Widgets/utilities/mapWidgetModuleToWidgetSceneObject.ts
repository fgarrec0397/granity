import { WidgetModule, WidgetSceneObject } from "@app/Widgets/widgetsTypes";

export default (widget: WidgetModule) => {
    const widgetSceneObject: WidgetSceneObject = {
        id: widget.id,
        component: widget.component,
        widgetDefinition: widget.widgetDefinition,
        editorOptions: widget.editorOptions,
    };

    return widgetSceneObject;
};
