import { MeshProps, ThreeEvent } from "@react-three/fiber";
import React, { FC, useState } from "react";
import { IWidget } from "../../App/Core/_Widgets/typings";

export interface GeometryFormsProps extends MeshProps {
    geometryFormsProps: string;
}

type OwnProps = GeometryFormsProps;

const hoveredColor = "#bdbdf5";

const GeometryForms: FC<OwnProps> = ({ geometryFormsProps = "" }) => {
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
        <mesh onPointerOver={handleOnPointerOver} onPointerOut={handleOnPointerOut}>
            <boxGeometry />
            <meshStandardMaterial color={hovered ? hoveredColor : "white"} />
        </mesh>
    );
};

export const widget: IWidget = {
    component: GeometryForms,
    reducer: null,
    widgetDefinition: {
        name: "Geometry",
        options: [
            {
                name: "form",
                displayName: "Form",
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
            },
        ],
    },
};
