import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useRef, useState } from "react";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import { IWidget } from "../types";
import useWidgetsUtilities from "../state/hooks/useWidgetsUtilities";

interface Props {
    widget: IWidget;
}

const WidgetRenderer: FC<Props> = ({ widget }) => {
    const ref = useRef();
    const [hovered, setHover] = useState(false);
    const { getWidgetName } = useWidgetsUtilities();
    const { widgetDefinition, component } = widget;

    const getWidgetDefaultProps = (): FeaturesWidgetsProps[] | undefined => {
        const props = widgetDefinition.options?.map((x) => ({
            [x.name as keyof FeaturesWidgetsProps]: x.defaultValue,
        }));

        return props as any; // FIXME -- fix that type problem later
    };

    const Component = component;
    const widgetProps = getWidgetDefaultProps() || [];
    const props = Object.assign({}, ...widgetProps) as FeaturesWidgetsProps;
    console.log("widgetRenderer");

    const name = getWidgetName(widget);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    // TODO - if the widget is selected, add edit button in Html component
    return (
        <group
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
        >
            <Component {...props} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
