import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useState } from "react";
import { FeaturesWidgetsProps } from "../../../../Features/collector";

type Props<T = FeaturesWidgetsProps> = T & {
    component: FC<T>;
};

const WidgetRenderer: FC<Props> = ({ component, ...componentProps }) => {
    const Component = component;
    const [hovered, setHover] = useState(false);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    return (
        <group
            name="WidgetRenderer"
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
        >
            <Component {...componentProps} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
