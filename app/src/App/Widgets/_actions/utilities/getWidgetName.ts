import widgetsConstants from "../widgetsConstants";
import { WidgetModule, WidgetSceneObject } from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default (widget: WidgetModule | WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
