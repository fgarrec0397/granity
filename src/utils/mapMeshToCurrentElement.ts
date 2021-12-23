// @ts-ignore
import THREE from "three";
import { CurrentElementInformations } from "../context/EditorContextProvider";

export default (mesh: THREE.Mesh): CurrentElementInformations => {
  return {
    id: mesh?.uuid,
    name: mesh?.geometry.type,
    position: [mesh?.position.x, mesh?.position.y, mesh?.position.z],
    rotation: [mesh?.rotation.x, mesh?.rotation.y, mesh?.rotation.z],
    scale: [mesh?.scale.x, mesh?.scale.y, mesh?.scale.z],
    mesh,
  };
};
