// @ts-ignore
import * as THREE from "three";
import mapMeshToCurrentElement from "../../utils/mapMeshToCurrentElement";
import useEditorContext from "./useEditorContext";

type CustomHookReturnType = (mesh: THREE.Mesh) => void;

export default (): CustomHookReturnType => {
  const { setCurrentElement } = useEditorContext();

  return (mesh: THREE.Mesh): void => {
    if (setCurrentElement) {
      setCurrentElement(mapMeshToCurrentElement(mesh));
    }
  };
};
