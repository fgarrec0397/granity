import { DefaultWidgetProps, WidgetOptions, WidgetType } from "@engine/api";

import { UIWidget, UIWidgetModule } from "../uiTypes";

export default <Props = DefaultWidgetProps, Options = WidgetOptions>(
    widget: UIWidget<Props, Options>
): UIWidgetModule<Props, Options> => {
    return {
        ...widget,
        type: WidgetType.UI,
    };
};
