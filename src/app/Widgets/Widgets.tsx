import React, { FC } from "react";
import { FeaturesWidgetsProps } from "../../Features/collector";
import WidgetRenderer from "./components/WidgetRenderer";
import { WidgetSceneObject } from "./types";
import useWidgets from "./state/hooks/useWidgets";
import useWidgetsUtilities from "./state/hooks/useWidgetsUtilities";
import { useAppSelector } from "../Core/store";

interface WidgetProps {
    widget: WidgetSceneObject;
}

const Widgets: FC = () => {
    const { widgets } = useWidgets();

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
    const { getWidgetName } = useWidgetsUtilities();
    const { component, id } = widget;
    const { widgetsDictionary } = useAppSelector((state) => state.widgets);
    const name = getWidgetName(widget);

    if (id) {
        const props: any = {};

        for (const option in widgetsDictionary[id]?.options) {
            if ({}.hasOwnProperty.call(widgetsDictionary[id]?.options, option)) {
                props[option] = widgetsDictionary[id].options[option].value;
            }
        }

        return <WidgetRenderer id={id} name={name} component={component} {...props} />;
    }

    return null;
};

export default Widgets;
