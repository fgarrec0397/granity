// @ts-ignore
import THREE from "three";
import { SceneElementInformations } from "../../Scene/_Editor/state/EditorContextProvider";

export default (
  mesh: THREE.Mesh,
  component = ""
  // updateOptions?: string[]
): SceneElementInformations => {
  return {
    id: mesh?.uuid,
    name: mesh?.geometry.type,
    position: [mesh?.position.x, mesh?.position.y, mesh?.position.z],
    rotation: [mesh?.rotation.x, mesh?.rotation.y, mesh?.rotation.z],
    scale: [mesh?.scale.x, mesh?.scale.y, mesh?.scale.z],
    component,
    mesh,
  };
};
