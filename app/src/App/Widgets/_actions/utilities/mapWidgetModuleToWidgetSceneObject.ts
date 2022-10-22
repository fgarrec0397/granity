import { WidgetObjectModule, WidgetObjectsDictionaryItem } from "../widgetsTypes";

export default (widget: WidgetObjectModule) => {
    const widgetSceneObject: WidgetObjectsDictionaryItem = {
        id: "",
        component: widget.component,
        hasRef: widget.hasRef,
        widgetDefinition: widget.widgetDefinition,
        editorOptions: widget.editorOptions,
    };

    return widgetSceneObject;
};
