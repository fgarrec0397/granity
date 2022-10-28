import { FC } from "react";

import useWidgets from "./_actions/hooks/useWidgets";
import { WidgetObjectsDictionaryItem } from "./_actions/widgetsTypes";
import WidgetRenderer from "./components/WidgetRenderer";

interface WidgetProps {
    widget: WidgetObjectsDictionaryItem;
}

const Widgets: FC = () => {
    const { widgetsObjects } = useWidgets();

    return (
        <>
            {Object.keys(widgetsObjects).map((widgetId) => (
                <Widget key={widgetId} widget={widgetsObjects[widgetId]} />
            ))}
        </>
    );
};

const Widget: FC<WidgetProps> = ({ widget }) => {
    const { id } = widget;

    if (id) {
        return <WidgetRenderer widget={widget} />;
    }

    return null;
};

export default Widgets;
