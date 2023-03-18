import { createWidget, EditableWidget, FieldType, WidgetType } from "@granity/engine";
import { FC } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color }) => {
    const GeometryComponent = shape;

    return (
        <mesh position={[0, 0, 0]}>
            <GeometryComponent />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

export const widget = createWidget({
    component: GeometryForms,
    reducer: null,
    type: WidgetType.GameObject,
    name: "Geometry",
    options: [
        {
            name: "color",
            displayName: "Color",
            fieldType: FieldType.Text,
            defaultValue: "white",
        },
        {
            name: "shape",
            displayName: "Shape",
            fieldType: FieldType.Select,
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
});
