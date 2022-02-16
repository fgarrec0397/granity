// @ts-ignore
import THREE from "three";
import { SceneElement } from "../../Scene/_Editor/state/types";

export default (
    mesh: THREE.Mesh,
    component = ""
    // updateOptions?: string[]
): SceneElement => {
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
