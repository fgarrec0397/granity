import { GLTFResult, Vector3Array } from "@app/Common/commonTypes";

export type PoopModelGLTFResult = GLTFResult<{
    nodes: {
        Object_3: THREE.Mesh;
        Object_4: THREE.Mesh;
        Object_5: THREE.Mesh;
        Object_6: THREE.Mesh;
        Object_7: THREE.Mesh;
        Object_8: THREE.Mesh;
    };
    materials: {
        Blanco_Ojos: THREE.MeshStandardMaterial;
        Cafe: THREE.MeshStandardMaterial;
        Custom: THREE.MeshStandardMaterial;
        Default: THREE.MeshStandardMaterial;
    };
}>;
