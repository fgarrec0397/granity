import {
    createWidget,
    EditableWidget,
    FieldType,
    useGameUpdate,
    WidgetType,
} from "@granity/engine";
import { RapierRigidBody } from "@react-three/rapier";
import { FC, useRef } from "react";
import { Vector3 } from "three";

import GameRigidbody from "../../Physics/components/GameRigidbody";

export type TerrainProps = EditableWidget & {
    translateXOnPlay: boolean;
    color: string;
};

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = ({ translateXOnPlay, color }) => {
    const ref = useRef<RapierRigidBody>(null);

    useGameUpdate(() => {
        if (ref.current && translateXOnPlay) {
            ref.current.setTranslation(
                new Vector3(
                    ref.current.translation().x + 0.01,
                    ref.current.translation().y,
                    ref.current.translation().z
                ),
                true
            );
        }
    });

    return (
        <GameRigidbody ref={ref} lockRotations>
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color={color} />
            </mesh>
        </GameRigidbody>
    );
};

export const widget = createWidget({
    component: Terrain,
    reducer: null,
    type: WidgetType.GameObject,
    name: "Terrain",
    options: [
        {
            name: "translateXOnPlay",
            displayName: "Translate X on play",
            fieldType: FieldType.Checkbox,
            defaultValue: false,
        },
        {
            name: "color",
            displayName: "Color",
            fieldType: FieldType.Text,
            defaultValue: "white",
        },
    ],
});
