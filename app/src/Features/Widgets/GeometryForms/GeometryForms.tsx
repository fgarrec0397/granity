import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { useBox } from "@react-three/cannon";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC, useRef } from "react";
import { Mesh } from "three";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color }) => {
    const GeometryComponent = shape;
    // const [ref] = useBox(() => ({ mass: 1, position: [0, 0, 0], type: "Kinematic" }));
    // const [ref, api] = useBox(
    //     () => ({
    //         position: [0, 0, 0],
    //     }),
    //     useRef<Mesh>(null)
    // );

    // TODO -- Test at the root of the widget in WidgetRenderer

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
    },
};
