import React, { FC } from "react";
import { IWidget } from "../../App/Widgets/types";
import { EditableWidget } from "../../App/Editor/types";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, hovered }) => {
    const GeometryComponent = shape;

    return (
        <mesh name="GeometryForms1" position={[0, 0, 0]}>
            <GeometryComponent />
            <meshStandardMaterial color={hovered ? "#bdbdf5" : "white"} />
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
