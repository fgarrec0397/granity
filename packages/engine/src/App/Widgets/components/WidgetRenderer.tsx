import { FC } from "react";

import { useWidgets } from "../_actions/hooks";
import { WidgetType } from "../_actions/widgetsConstants";
import WidgetObjectRenderer from "./WidgetsRenderers/WidgetObjectRenderer";
import WidgetUIRenderer from "./WidgetsRenderers/WidgetUIRenderer";

interface WidgetItemProps {
    widgetId: string;
}

const WidgetRenderer: FC<WidgetItemProps> = ({ widgetId }) => {
    const { getWidgetById } = useWidgets();

    const widget = getWidgetById(widgetId);

    if (!widget) {
        return null;
    }

    if (widget.type === WidgetType.GameObject) {
        return <WidgetObjectRenderer widgetId={widgetId} />;
    }

    if (widget.type === WidgetType.UI) {
        return <WidgetUIRenderer widgetId={widgetId} />;
    }
    return null;
};

export default WidgetRenderer;
