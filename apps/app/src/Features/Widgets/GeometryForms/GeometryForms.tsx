import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import GameRigidbody from "@features/Physics/components/GameRigidbody";
import { unSerializeVector3 } from "@granity/helpers";
import { RigidBodyApi } from "@react-three/rapier";
import { FC, useEffect, useRef } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color, gravityScale, position }) => {
    const GeometryComponent = shape;
    const colliderRef = useRef<RigidBodyApi>(null);

    useEffect(() => {
        if (colliderRef.current) {
            colliderRef.current.setTranslation(unSerializeVector3(position));
        }
    }, [position]);

    return (
        <GameRigidbody ref={colliderRef} gravityScale={gravityScale}>
            <mesh position={[0, 0, 0]}>
                <GeometryComponent />
                <meshStandardMaterial color={color} />
            </mesh>
        </GameRigidbody>
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
            name: "gravityScale",
            displayName: "Gravity Scale",
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
});
