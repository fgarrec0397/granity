import widgetsConstants from "../widgetsConstants";
import { WidgetSceneObject } from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default (widget: WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
