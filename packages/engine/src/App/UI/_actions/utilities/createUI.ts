import { createWidget, DefaultWidgetProps, WidgetOptions } from "@engine/api";
import { clone, SetOptionalPropertyFrom } from "@granity/helpers";

import uiWidgetMapper from "../mappers/uiWidgetMapper";
import { UIWidgetModule } from "../uiTypes";

/**
 * A function helping you creating a UI widget.
 *
 */
export default <Props = DefaultWidgetProps, Options = WidgetOptions>(
    widget: SetOptionalPropertyFrom<UIWidgetModule<Props, Options>, "type">
) => {
    const clonedWidget = clone(widget);
    const widgetModule = uiWidgetMapper(clonedWidget);

    return createWidget<UIWidgetModule<Props, Options>>(widgetModule);
};
