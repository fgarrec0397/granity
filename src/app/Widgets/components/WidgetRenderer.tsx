import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useEffect, useRef, useState } from "react";
import { Object3D } from "three";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import { useAppSelector } from "../../Core/store";
import useWidgets from "../state/hooks/useWidgets";
import { WidgetProperties } from "../types";

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
    const [localProperties, setLocalProperties] = useState<WidgetProperties>();
    const { updateCurrentWidgetWithMesh } = useWidgets();

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
            onUpdate={(self) => {
                // setLocalProperties({
                //     position: [self.position.x, self.position.y, self.position.z],
                //     rotation: [self.rotation.x, self.rotation.y, self.rotation.z],
                //     scale: [self.scale.x, self.scale.y, self.scale.z],
                // });
                // updateCurrentWidgetWithMesh(self);
            }}
            // position={position}
            {...widgetsDictionary[id].properties} // TODO -- Make sure properties are match at least when an item is deleted
        >
            <Component {...componentProps} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
