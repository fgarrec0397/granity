import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { Object3D } from "three";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import { WidgetProperties } from "../types";

type Props<T = FeaturesWidgetsProps> = T & {
    component: FC<T>;
    name: string;
    properties: WidgetProperties;
};

const WidgetRenderer: FC<Props> = ({ component, name, properties, ...componentProps }) => {
    const Component = component;
    const ref = useRef<Object3D>();
    const [hovered, setHover] = useState(false);
    const [localProperties, setLocalProperties] = useState<WidgetProperties>();

    useEffect(() => {
        // if (ref.current) {
        //     ref.current.position.set(
        //         properties.position[0],
        //         properties.position[1],
        //         properties.position[2]
        //     );
        // }
        setLocalProperties(properties);
    }, [properties, setLocalProperties]);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    useEffect(() => {
        console.log({ ref: ref.current, properties }, "properties");
    }, [properties]);

    return (
        <group
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...localProperties} // TODO -- Make sure properties are match at least when an item is deleted
        >
            <Component {...componentProps} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
