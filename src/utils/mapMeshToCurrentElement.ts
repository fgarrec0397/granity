// @ts-ignore
import THREE from "three";
import { SceneElementInformations } from "../Scene/Editor/state/EditorContextProvider";

export default (mesh: THREE.Mesh, component = ""): SceneElementInformations => {
  return {
    id: mesh?.uuid,
    name: mesh?.geometry.type,
    component,
    mesh,
  };
};
