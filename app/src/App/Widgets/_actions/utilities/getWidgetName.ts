import widgetsConstants from "../widgetsConstants";
import { WidgetDictionaryItem } from "../widgetsTypes";

const { widgetObjectsPrefix } = widgetsConstants;

export default <WidgetType extends WidgetDictionaryItem>(widget: WidgetType) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
