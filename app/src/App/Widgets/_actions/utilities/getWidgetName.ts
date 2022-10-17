import widgetsConstants from "../widgetsConstants";
import { WidgetObjectsDictionaryItem } from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default (widget: WidgetObjectsDictionaryItem) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
