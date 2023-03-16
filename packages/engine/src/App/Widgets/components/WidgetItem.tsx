import { FC } from "react";

import { useWidgets } from "../_actions/hooks";
import { WidgetType } from "../_actions/widgetsConstants";
import WidgetObjectRenderer from "./WidgetsRenderers/WidgetObjectRenderer";
import WidgetUIRenderer from "./WidgetsRenderers/WidgetUIRenderer";

interface WidgetItemProps {
    widgetId: string;
}

const WidgetItem: FC<WidgetItemProps> = ({ widgetId }) => {
    const { getWidgetById } = useWidgets();

    const widget = getWidgetById(widgetId);

    if (!widget) {
        return null;
    }

    if (widget.type === WidgetType.GameObject) {
        return <WidgetObjectRenderer widget={widget} />;
    }

    if (widget.type === WidgetType.UI) {
        return <WidgetUIRenderer widget={widget} />;
    }

    return null;
};

export default WidgetItem;
