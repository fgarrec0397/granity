import { createWidget, WidgetType } from "@engine/api";
import { clone } from "@granity/helpers";

import { UIWidgetModule } from "../uiTypes";

/**
 * A function helping you creating a UI widget.
 *
 */
export default <PropsType = null>(widget: UIWidgetModule) => {
    const widgetModule: UIWidgetModule = clone(widget);

    widgetModule.type = WidgetType.UI;

    return createWidget<UIWidgetModule, PropsType>(widgetModule);
};
