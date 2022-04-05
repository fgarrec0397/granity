import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useRef, useState } from "react";
import { FeaturesWidgetsProps } from "../../../../Features/collector";

type Props<T = FeaturesWidgetsProps> = T & {
    component: FC<T>;
    name: string;
};

const WidgetRenderer: FC<Props> = ({ component, name, ...componentProps }) => {
    const Component = component;
    const ref = useRef();
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
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
        >
            <Component {...componentProps} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
