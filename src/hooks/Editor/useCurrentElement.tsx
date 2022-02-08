// @ts-ignore
import * as THREE from "three";
import { CurrentElementInformations } from "../../context/EditorContextProvider";
import mapMeshToCurrentElement from "../../utils/mapMeshToCurrentElement";
import useEditorContext from "./useEditorContext";

interface CustomHookReturnType {
  currentElement: CurrentElementInformations | undefined;
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
