import { Vector3Array } from "@app/Common/commonTypes";
import useObjectSize from "@app/Common/hooks/useObjectSize";
import { serializeVector3 } from "@app/Common/utilities";
import useKeyboardMapping from "@app/Core/_actions/hooks/useKeyboardMapping";
import { ClientKeyMappings } from "@app/Core/coreTypes";
import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import GameRigidbody from "@features/Physics/components/GameRigidbody";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBodyApi } from "@react-three/rapier";
import { createRef, FC, useEffect, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";

import poopReducer from "./_actions/_data/state/poopReducer";
import usePoop from "./_actions/hooks/usePoop";
import { PoopModelGLTFResult } from "./_actions/poopTypes";

export type PoopProps = EditableWidget;

const Poop: FC<PoopProps> = ({ position }) => {
    const { nodes, materials } = useGLTF("/assets/Poop.gltf") as PoopModelGLTFResult;
    const ref = useRef<Group>(null);
    const meshRef = useRef<Mesh>(null);
    const [groupPosition, setGroupPosition] = useState<Vector3Array>([0, 0, 0]);
    const colliderRef = createRef<RigidBodyApi>();
    const { getSize } = useObjectSize();
    const { isEditor } = useEditor();
    const poopSpeed = 0.01;
    const { passToilet, die } = usePoop();

    useKeyboardMapping((keyMapping: ClientKeyMappings) => {
        if (keyMapping.jump && colliderRef.current) {
            colliderRef.current.applyImpulse(new Vector3(poopSpeed, 0.3, 0));
        }
    }, []);

    useEffect(() => {
        if (meshRef.current) {
            const meshSize = getSize(meshRef.current, [0.008, 0.008, 0.008]);

            if (meshSize) {
                const newGroupPosition = serializeVector3(
                    new Vector3(-(meshSize.x / 2), -(meshSize.y / 2), meshSize.z / 2)
                );

                setGroupPosition(newGroupPosition);
            }
        }
    }, [meshRef, getSize, position]);

    useGameUpdate(() => {
        if (colliderRef.current) {
            colliderRef.current.setTranslation(
                new Vector3(
                    colliderRef.current.translation().x + poopSpeed,
                    colliderRef.current.translation().y,
                    colliderRef.current.translation().z
                )
            );
        }
    });

    return (
        <GameRigidbody
            ref={colliderRef}
            colliders={false}
            enabledRotations={[true, true, false]}
            gravityScale={2.5}
            angularDamping={2.5}
            linearDamping={10}
            userData={{
                name: "poop",
            }}
            onIntersectionEnter={() => {
                passToilet();
            }}
        >
            {!isEditor && (
                <CuboidCollider
                    args={[0.15, 0.15, 0.15]}
                    onCollisionEnter={() => {
                        die();
                    }}
                />
            )}
            <group position={groupPosition}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <group scale={[0.008, 0.008, 0.008]} ref={ref}>
                        <mesh geometry={nodes.Object_3.geometry} material={materials.Blanco_Ojos} />
                        <mesh
                            ref={meshRef}
                            geometry={nodes.Object_4.geometry}
                            material={materials.Cafe}
                        />
                        <mesh geometry={nodes.Object_5.geometry} material={materials.Cafe} />
                        <mesh geometry={nodes.Object_6.geometry} material={materials.Custom} />
                        <mesh geometry={nodes.Object_7.geometry} material={materials.Default} />
                        <mesh geometry={nodes.Object_8.geometry} material={materials.Default} />
                    </group>
                </group>
            </group>
        </GameRigidbody>
    );
};

export const widget = createWidget({
    component: Poop,
    reducer: poopReducer,
    widgetDefinition: {
        name: "Poop",
    },
});
