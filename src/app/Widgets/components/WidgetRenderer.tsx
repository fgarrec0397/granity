import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useRef, useState } from "react";
import { Object3D } from "three";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import { useAppSelector } from "../../Core/store";

type Props<T = FeaturesWidgetsProps> = T & {
    component: FC<T>;
    name: string;
    id: string;
};

const WidgetRenderer: FC<Props> = ({ component, name, id, ...componentProps }) => {
    const Component = component;
    const ref = useRef<Object3D>();
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary } = useAppSelector((state) => state.widgets);

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
            {...widgetsDictionary[id].properties}
        >
            <Component {...componentProps} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
