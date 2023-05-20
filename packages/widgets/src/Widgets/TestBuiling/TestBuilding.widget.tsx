import { createWidget, GameRigidBody, WidgetType } from "@granity/engine";
import { useGLTF } from "@granity/three/drei";
import * as stdlib from "@granity/three/stdlib";
import * as THREE from "three";

type GLTFResult = stdlib.GLTF & {
    nodes: {
        Cube: THREE.Mesh;
        Cube001: THREE.Mesh;
        Cube002: THREE.Mesh;
    };
    materials: {
        Material: THREE.MeshStandardMaterial;
        ["Material.001"]: THREE.MeshStandardMaterial;
        ["Material.002"]: THREE.MeshStandardMaterial;
    };
};

const TestBuilding = (props: JSX.IntrinsicElements["group"]) => {
    const { nodes, materials } = useGLTF("/assets/test-building.glb") as GLTFResult;
    return (
        <GameRigidBody colliders="trimesh" gravityScale={0} type="kinematicPosition">
            <group {...props} dispose={null}>
                <mesh
                    geometry={nodes.Cube.geometry}
                    material={materials.Material}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-10, -0.02, -3.77]}
                />
                <mesh
                    geometry={nodes.Cube001.geometry}
                    material={materials["Material.001"]}
                    position={[0, 3.55, 3.75]}
                    rotation={[-Math.PI / 2, 0, -Math.PI]}
                    scale={[-10, -0.02, -3.77]}
                />
                <mesh
                    geometry={nodes.Cube002.geometry}
                    material={materials["Material.002"]}
                    position={[0, 3.55, -3.74]}
                    rotation={[-Math.PI / 2, 0, -Math.PI]}
                    scale={[-10, -0.02, -3.77]}
                />
            </group>
        </GameRigidBody>
    );
};

export const widget = createWidget({
    component: TestBuilding,
    reducer: null,
    type: WidgetType.GameObject,
    name: "TestBuilding",
    // options: [
    //     {
    //         name: "model",
    //         displayName: "3D Model",
    //         fieldType: FieldType.File,
    //         defaultValue: "",
    //     },
    // ],
});
