import React, { FC } from "react";
import { IWidget } from "../../App/Widgets/types";
import { EditableWidget } from "../../App/Editor/types";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, hovered }) => {
    const GeometryComponent = shape;

    // return (
    //     <mesh name="GeometryForms1" position={[1, 1, 1]}>
    //         <GeometryComponent />
    //         <meshStandardMaterial color={hovered ? "#bdbdf5" : "white"} />
    //     </mesh>
    // );
    return (
        <group name="group">
            <mesh name="GeometryForms1" position={[1, 1, 1]}>
                <GeometryComponent />
                <meshStandardMaterial color={hovered ? "#bdbdf5" : "white"} />
            </mesh>
            <mesh name="GeometryForms2" position={[2, 2, 2]}>
                <GeometryComponent />
                <meshStandardMaterial color={hovered ? "#bdbdf5" : "white"} />
            </mesh>
        </group>
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
