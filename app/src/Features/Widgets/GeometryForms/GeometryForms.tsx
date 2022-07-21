import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
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

export const widget: WidgetModule<GeometryFormsProps> = {
    component: GeometryForms,
    reducer: null,
    widgetDefinition: {
        name: "Geometry",
        physic: {
            shape: "Box",
            type: "Dynamic",
            mass: 1,
        },
        options: [
            {
                name: "color",
                displayName: "Color",
                fieldType: FieldType.Text,
                defaultValue: "white",
            },
            {
                name: "number",
                displayName: "Number",
                fieldType: FieldType.Number,
                defaultValue: 1,
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
    },
};
