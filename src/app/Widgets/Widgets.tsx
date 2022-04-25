import React, { FC } from "react";
import { FeaturesWidgetsProps } from "../../Features/collector";
import WidgetRenderer from "./components/WidgetRenderer";
import { WidgetSceneObject } from "./types";
import useWidgets from "./state/hooks/useWidgets";
import useWidgetsUtilities from "./state/hooks/useWidgetsUtilities";

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
    const { widgetDefinition, component, properties } = widget;
    const getWidgetDefaultProps = (): FeaturesWidgetsProps[] | undefined => {
        const props = widgetDefinition.options?.map((x) => ({
            [x.name as keyof FeaturesWidgetsProps]: x.defaultValue,
        }));

        return props as any; // FIXME -- fix that type problem later
    };

    const widgetProps = getWidgetDefaultProps() || [];
    const props = Object.assign({}, ...widgetProps) as FeaturesWidgetsProps;
    const name = getWidgetName(widget);

    return <WidgetRenderer name={name} component={component} properties={properties} {...props} />;
};

export default Widgets;
