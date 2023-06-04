import { GameWidgetDictionaryItem } from "@engine/App/Game/_actions/gameTypes";
import { UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
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
        return <WidgetObjectRenderer widget={widget as GameWidgetDictionaryItem} />;
    }

    if (widget.type === WidgetType.UI) {
        return <WidgetUIRenderer widget={widget as UIWidgetDictionaryItem} />;
    }

    return null;
};

export default WidgetRenderer;
