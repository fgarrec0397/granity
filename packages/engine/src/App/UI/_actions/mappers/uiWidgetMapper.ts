import { WidgetType } from "@engine/api";

import { DefaultUIWidgetProps, UIWidget, UIWidgetModule } from "../uiTypes";

export default <Props = DefaultUIWidgetProps>(widget: UIWidget<Props>): UIWidgetModule<Props> => {
    return {
        ...widget,
        type: WidgetType.UI,
    };
};
