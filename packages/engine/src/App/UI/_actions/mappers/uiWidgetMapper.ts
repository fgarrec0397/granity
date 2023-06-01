import { WidgetType } from "@engine/api";

import { UIWidget, UIWidgetModule } from "../uiTypes";

export default (widget: UIWidget): UIWidgetModule => {
    return {
        ...widget,
        type: WidgetType.UI,
    };
};
