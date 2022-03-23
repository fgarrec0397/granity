import React, { FC } from "react";
import useWidgets from "../../Editor/state/hooks/useWidgets";
import { IWidget } from "./typings";

const InstantiateObject = (widget: IWidget): React.ReactNode => {
    const widgetProps = {} as any;

    return React.createElement(widget.component, {
        key: widget.widgetDefinition.name,
        ...widgetProps,
    });
};

const Widgets: FC = () => {
    const { widgets } = useWidgets();

    return <>{widgets.map((widget) => InstantiateObject(widget))}</>;
};

export default Widgets;
