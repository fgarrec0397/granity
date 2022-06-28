import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, hovered }) => {
    const GeometryComponent = shape;
    return (
        <mesh name="GeometryForms1" position={[0, 0, 0]}>
            <GeometryComponent />
            {/* <meshStandardMaterial color={hovered ? "#bdbdf5" : "white"} /> */}
            <meshStandardMaterial color={"blue"} />
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
