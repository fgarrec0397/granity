import { WidgetModule, WidgetSceneObject } from "../types";
import constants from "../../Core/constants";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export default (widget: WidgetModule | WidgetSceneObject) => {
    return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
};
