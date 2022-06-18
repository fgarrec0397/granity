import { WidgetModule, WidgetSceneObject } from "@app/Widgets/widgetsTypes";
import constants from "@core/constants";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export default (widget: WidgetModule | WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
