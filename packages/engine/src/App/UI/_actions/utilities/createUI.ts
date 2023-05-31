import { createWidget } from "@engine/api";
import { clone, SetOptionalPropertyFrom } from "@granity/helpers";

import uiWidgetMapper from "../mappers/uiWidgetMapper";
import { UIWidgetModule } from "../uiTypes";

/**
 * A function helping you creating a UI widget.
 *
 */
export default (widget: SetOptionalPropertyFrom<UIWidgetModule, "type">) => {
    const clonedWidget = clone(widget);
    const widgetModule = uiWidgetMapper(clonedWidget);

    return createWidget<UIWidgetModule>(widgetModule);
};
