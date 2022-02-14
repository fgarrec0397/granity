// @ts-ignore
import THREE from "three";
import { SceneElementInformations } from "../../Scene/_Editor/state/types";

export default (
    mesh: THREE.Mesh,
    component = ""
    // updateOptions?: string[]
): SceneElementInformations => {
    return {
        id: mesh?.uuid,
        name: mesh?.geometry.type,
        position: mesh?.position,
        rotation: mesh?.rotation,
        scale: mesh?.scale,
        component,
        mesh, // TODO -- Delete this when getMesh will be implemented
    };
};
