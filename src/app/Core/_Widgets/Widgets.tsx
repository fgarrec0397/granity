import React, { FC } from "react";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import uidGenerator from "../../Common/utils/uidGenerator";
import useWidgets from "../../Editor/state/hooks/useWidgets";
import WidgetRenderer from "./components/WidgetRenderer";
import { IWidget } from "./types";

const InstantiateObject = (widget: IWidget): React.ReactNode => {
    const { widgetDefinition, component } = widget;
    const getWidgetDefaultProps = (): FeaturesWidgetsProps[] | undefined => {
        const props = widgetDefinition.options?.map((x) => ({
            [x.name as keyof FeaturesWidgetsProps]: x.defaultValue,
        }));

        return props as any; // FIXME -- fix that type problem later
    };

    const widgetProps = getWidgetDefaultProps() || [];
    const props = Object.assign({}, ...widgetProps) as FeaturesWidgetsProps;

    // TODO -- make a link between widgets object and scene objects
    // Use WidgetRendrer to structure all 3d objects
    // Maybe setup a library (array of IWidget) that contains all different IWidget possible to get reference later
    // Find a unified way of syncing widgets and scene objects

    return React.createElement(WidgetRenderer, {
        key: uidGenerator(),
        component,
        name: widgetDefinition.name,
        ...props,
    });
};

const Widgets: FC = () => {
    const { widgets } = useWidgets();

    return <>{widgets.map((widget) => InstantiateObject(widget))}</>;
};

export default Widgets;
