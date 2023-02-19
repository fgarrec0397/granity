import { createWidget, EditableWidget, FieldType, WidgetType } from "@granity/engine";
import { unSerializeVector3 } from "@granity/helpers";
import { RapierRigidBody } from "@react-three/rapier";
import { FC, useEffect, useRef } from "react";

import GameRigidbody from "../../Physics/components/GameRigidbody";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color, gravityScale, position }) => {
    const GeometryComponent = shape;
    const colliderRef = useRef<RapierRigidBody>(null);

    useEffect(() => {
        if (colliderRef.current) {
            colliderRef.current.setTranslation(unSerializeVector3(position), true);
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
