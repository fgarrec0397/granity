import { WidgetModule, WidgetSceneObject } from "@widgets/widgetsTypes";
import widgetsConstants from "@widgets/widgetsConstants";

const { widgetObjectsPrefix } = widgetsConstants;

export default (widget: WidgetModule | WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
