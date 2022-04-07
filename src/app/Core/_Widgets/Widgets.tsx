import React, { FC } from "react";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import useWidgets from "../../Editor/state/hooks/useWidgets";
import WidgetRenderer from "./components/WidgetRenderer";
import { IWidget } from "./types";
import constants from "../constants";

const {
    widget: { widgetObjectsPrefix },
} = constants;

interface WidgetProps {
    widget: IWidget<FeaturesWidgetsProps>;
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
    const { id, widgetDefinition, component } = widget;
    const getWidgetDefaultProps = (): FeaturesWidgetsProps[] | undefined => {
        const props = widgetDefinition.options?.map((x) => ({
            [x.name as keyof FeaturesWidgetsProps]: x.defaultValue,
        }));

        return props as any; // FIXME -- fix that type problem later
    };

    const widgetProps = getWidgetDefaultProps() || [];
    const props = Object.assign({}, ...widgetProps) as FeaturesWidgetsProps;
    const name = `${widgetObjectsPrefix}+${widgetDefinition.name}+${id}`;

    return <WidgetRenderer name={name} component={component} {...props} />;
};

export default Widgets;
