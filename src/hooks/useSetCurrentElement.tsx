// @ts-ignore
import * as THREE from "three";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContextProvider";
import mapMeshToCurrentElement from "../utils/mapMeshToCurrentElement";

export default () => {
  return (mesh: THREE.Mesh): void => {
    const { setCurrentElement } = useContext(EditorContext);

    if (setCurrentElement) {
      setCurrentElement(mapMeshToCurrentElement(mesh));
    }
  };
};
