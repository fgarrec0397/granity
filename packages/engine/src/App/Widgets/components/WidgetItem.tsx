import { FC } from "react";

import { useWidgets } from "../_actions/hooks";
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

    // TODO - widgetsDataArchitecture - Check to pass a renderer instead of hardcoded  condition with components
    // if (widget.type === WidgetType.GameObject) {
    //     return <WidgetObjectRenderer widget={widget} />;
    // }

    // if (widget.type === WidgetType.UI) {
    //     return <WidgetUIRenderer widget={widget} />;
    // }
    return <WidgetObjectRenderer widget={widget} />;

    return null;
};

export default WidgetItem;
