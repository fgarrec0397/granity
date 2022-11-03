import { Vector3Array } from "@app/Common/commonTypes";
import { useIntersect } from "@app/Common/hooks/useIntersect";
import useObjectSize from "@app/Common/hooks/useObjectSize";
import { serializeVector3 } from "@app/Common/utilities";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import GameRigidbody from "@features/Physics/components/GameRigidbody";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider } from "@react-three/rapier";
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

import useToilets from "../_actions/hooks/useToilets";
import { ToiletModel, ToiletModelGLTFResult } from "../_actions/toiletsTypes";

export type ToiletColumnProps = {
    toilet: ToiletModel;
    index: number;
};

const ToiletColumn: FC<ToiletColumnProps> = ({ toilet }) => {
    const { nodes, materials } = useGLTF("/assets/Toilet.gltf") as unknown as ToiletModelGLTFResult;
    const groupScale: Vector3Array = useMemo(() => [0.05, 0.05, 0.05], []);
    const { setIsVisible } = useToilets();
    const { getSize } = useObjectSize();
    const rbRef = useRef<RigidBodyApi>(null);
    const rbRef2 = useRef<RigidBodyApi>(null);
    const { isEditor } = useEditor();
    const [groupPosition, setGroupPosition] = useState<Vector3Array>([0, 0, 0]);
    const [groupPosition2, setGroupPosition2] = useState<Vector3Array>([0, 0, 0]);
    const ref = useIntersect((visible) => {
        setIsVisible(toilet.id, toilet.toiletsChunkId, visible);
    });

    const rigibodyProps = {
        gravityScale: 0,
    };

    useEffect(() => {
        if (ref.current) {
            const meshSize = getSize(ref.current, groupScale);

            if (meshSize) {
                const newGroupPosition = serializeVector3(
                    new Vector3(meshSize.x / 4, -meshSize.y, -meshSize.z / 6)
                );
                setGroupPosition(newGroupPosition);

                const newGroupPosition2 = serializeVector3(
                    new Vector3(-meshSize.x / 3, meshSize.y, -meshSize.z / 6)
                );
                setGroupPosition2(newGroupPosition2);
            }
        }
    }, [ref, getSize, groupScale]);

    return (
        <>
            <GameRigidbody
                ref={rbRef}
                type="kinematicVelocity"
                colliders={false}
                position={toilet.position}
                {...rigibodyProps}
            >
                {!isEditor && <CuboidCollider args={[3, 4, 2]} />}

                <group scale={groupScale} position={groupPosition} dispose={null}>
                    <mesh
                        ref={ref}
                        geometry={nodes.Cylinder001.geometry}
                        material={materials["Material #25"]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        geometry={nodes.Box001.geometry}
                        material={materials["Material #25"]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        geometry={nodes.Box002.geometry}
                        material={materials["Material #25"]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    />
                </group>
            </GameRigidbody>
            <GameRigidbody
                ref={rbRef2}
                type="kinematicVelocity"
                colliders={false}
                position={[toilet.position[0], toilet.position[1] + 20, toilet.position[2]]}
                {...rigibodyProps}
            >
                {!isEditor && <CuboidCollider args={[3, 4, 2]} />}

                <group scale={[0.05, 0.05, 0.05]} position={groupPosition2} dispose={null}>
                    <mesh
                        geometry={nodes.Cylinder001.geometry}
                        material={materials["Material #25"]}
                        rotation={[-Math.PI / 2, -Math.PI, 0]}
                    />
                    <mesh
                        geometry={nodes.Box001.geometry}
                        material={materials["Material #25"]}
                        rotation={[-Math.PI / 2, -Math.PI, 0]}
                    />
                    <mesh
                        geometry={nodes.Box002.geometry}
                        material={materials["Material #25"]}
                        rotation={[-Math.PI / 2, -Math.PI, 0]}
                    />
                </group>
            </GameRigidbody>
            <GameRigidbody
                scale={[10, 100, 20]}
                position={toilet.position}
                rotation={[0, -Math.PI / 2, 0]}
                userData={{
                    name: "flag",
                }}
                sensor
            >
                <mesh>
                    <planeBufferGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </GameRigidbody>
        </>
    );
};

export default ToiletColumn;
