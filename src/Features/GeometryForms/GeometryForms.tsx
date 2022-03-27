import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useState } from "react";
import { IWidget } from "../../App/Core/_Widgets/typings";

export interface GeometryFormsProps {
    shape: string;
}

type OwnProps = GeometryFormsProps;

const hoveredColor = "#bdbdf5";

const GeometryForms: FC<OwnProps> = ({ shape }) => {
    const [hovered, setHover] = useState(false);
    const GeometryComponent = shape;

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    return (
        <mesh onPointerOver={handleOnPointerOver} onPointerOut={handleOnPointerOut}>
            <GeometryComponent />
            <meshStandardMaterial color={hovered ? hoveredColor : "white"} />
        </mesh>
    );
};

export const widget: IWidget<GeometryFormsProps> = {
    component: GeometryForms,
    reducer: null,
    widgetDefinition: {
        name: "Geometry",
        options: [
            {
                name: "shape",
                displayName: "Shape",
                fieldType: "Select",
                selectOptions: [
                    {
                        value: "BoxGeometry",
                        name: "Cube",
                    },
                    {
                        value: "PlaneGeometry",
                        name: "Plane",
                    },
                ],
                defaultValue: "BoxGeometry",
            },
        ],
    },
};
