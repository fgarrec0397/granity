import { FC } from "react";
import WidgetRenderer from "./components/WidgetRenderer";
import { WidgetSceneObject } from "./widgetsTypes";
import useWidgets from "./hooks/useWidgets";
import useWidgetsConnector from "./hooks/useWidgetsConnector";

interface WidgetProps {
    widget: WidgetSceneObject;
}

const Widgets: FC = () => {
    const { widgets } = useWidgets();

    useWidgetsConnector();

    return (
        <>
            {widgets.map((widget, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Widget key={index} widget={widget} />
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
