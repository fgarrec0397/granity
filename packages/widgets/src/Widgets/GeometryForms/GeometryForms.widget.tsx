import { createWidget, EditableWidget, FieldType, WidgetType } from "@granity/engine";
import { FC, useEffect } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
    testCheckbox: boolean;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color, testCheckbox }) => {
    const GeometryComponent = shape;

    useEffect(() => {
        console.log(testCheckbox, "testCheckbox");
    }, [testCheckbox]);

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
            name: "testCheckbox",
            displayName: "Checkbox",
            fieldType: FieldType.Checkbox,
            defaultValue: true,
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
