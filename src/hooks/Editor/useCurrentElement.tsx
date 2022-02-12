// @ts-ignore
import * as THREE from "three";
import { SceneElementInformations } from "../../context/EditorContextProvider";
import mapMeshToCurrentElement from "../../utils/mapMeshToCurrentElement";
import useEditorContext from "./useEditorContext";

interface CustomHookReturnType {
  currentElement: SceneElementInformations | undefined;
  setCurrentElement: (mesh: THREE.Mesh) => void;
}

export default (): CustomHookReturnType => {
  const { currentElement, setCurrentElement } = useEditorContext();

  return {
    currentElement,
    setCurrentElement: (mesh: THREE.Mesh): void => {
      if (setCurrentElement) {
        setCurrentElement(mapMeshToCurrentElement(mesh));
      }
    },
  };
};
