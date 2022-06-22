import { WidgetModule, WidgetSceneObject } from "../widgetsTypes";
import widgetsConstants from "../widgetsConstants";

const { widgetObjectsPrefix } = widgetsConstants;

export default (widget: WidgetModule | WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
