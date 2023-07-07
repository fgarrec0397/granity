import { GameWidgetDictionaryItem } from "@engine/App/Game/_actions/gameTypes";
import { UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
import { HasChildren, RecursiveArrayOfIdsItem } from "@granity/helpers";
import { FC } from "react";

import { useWidgets } from "../_actions/hooks";
import { WidgetType } from "../_actions/widgetsConstants";
import GameWidgetRenderer from "./WidgetsRenderers/GameWidgetRenderer";
import UIWidgetRenderer from "./WidgetsRenderers/UIWidgetRenderer";

interface WidgetItemProps extends HasChildren {
    widgetId: RecursiveArrayOfIdsItem<string>;
}

const WidgetRenderer: FC<WidgetItemProps> = ({ widgetId, children }) => {
    const { getWidgetById } = useWidgets();

    const widget = getWidgetById(widgetId.id);

    if (!widget) {
        return null;
    }

    if (widget.type === WidgetType.GameObject) {
        return (
            <GameWidgetRenderer widget={widget as GameWidgetDictionaryItem} widgetId={widgetId}>
                {children}
            </GameWidgetRenderer>
        );
    }

    if (widget.type === WidgetType.UI) {
        return <UIWidgetRenderer widget={widget as UIWidgetDictionaryItem} />;
    }

    return null;
};

export default WidgetRenderer;
