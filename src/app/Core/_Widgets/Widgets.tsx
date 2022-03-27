import React, { FC } from "react";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import useWidgets from "../../Editor/state/hooks/useWidgets";
import { IWidget } from "./typings";

const InstantiateObject = (widget: IWidget): React.ReactNode => {
    const getWidgetProps = (): FeaturesWidgetsProps[] | undefined => {
        const props = widget.widgetDefinition.options?.map((x) => ({
            [x.name as keyof FeaturesWidgetsProps]: x.defaultValue,
        }));

        return props as any; // TODO -- fix that type problem later
    };

    const widgetProps = getWidgetProps() || [];
    const props = Object.assign({}, ...widgetProps) as FeaturesWidgetsProps;

    return React.createElement(widget.component, {
        key: widget.widgetDefinition.name,
        ...props,
    });
};

const Widgets: FC = () => {
    const { widgets } = useWidgets();

    return <>{widgets.map((widget) => InstantiateObject(widget))}</>;
};

export default Widgets;
