import { WidgetModule, WidgetObjectsDictionaryItem } from "../widgetsTypes";

export default (widget: WidgetModule) => {
    const widgetSceneObject: WidgetObjectsDictionaryItem = {
        id: "",
        component: widget.component,
        hasRef: widget.hasRef,
        widgetDefinition: widget.widgetDefinition,
        editorOptions: widget.editorOptions,
    };

    return widgetSceneObject;
};
