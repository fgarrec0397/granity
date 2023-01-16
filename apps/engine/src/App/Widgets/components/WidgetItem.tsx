import { FC } from "react";

import { WidgetType } from "../_actions/widgetsConstants";
import { WidgetDictionaryItem } from "../_actions/widgetsTypes";
import WidgetObjectRenderer from "./WidgetsRenderers/WidgetObjectRenderer";
import WidgetUIRenderer from "./WidgetsRenderers/WidgetUIRenderer";

interface WidgetItemProps {
    widget: WidgetDictionaryItem;
}

const WidgetItem: FC<WidgetItemProps> = ({ widget }) => {
    if (widget.type === WidgetType.GameObject) {
        return <WidgetObjectRenderer widget={widget} />;
    }

    if (widget.type === WidgetType.UI) {
        return <WidgetUIRenderer widget={widget} />;
    }

    return null;
};

export default WidgetItem;
