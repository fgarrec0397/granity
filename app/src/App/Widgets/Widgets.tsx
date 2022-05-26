import { FC } from "react";
import WidgetRenderer from "./components/WidgetRenderer";
import { WidgetSceneObject } from "./types";
import { getWidgetName } from "./utilities";
import useWidgets from "./state/hooks/useWidgets";
import useWidgetsConnector from "./state/hooks/useWidgetsConnector";

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
    const { component, id } = widget;
    const name = getWidgetName(widget);

    if (id) {
        return <WidgetRenderer id={id} name={name} component={component} />;
    }

    return null;
};

export default Widgets;
