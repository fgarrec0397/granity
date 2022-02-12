import { Physics } from "@react-three/cannon";
import React, { FC, useEffect, useState } from "react";
import CameraControls from "./CameraControls";
import GeometryInstantiator from "../Editor/GeometryInstantiator";
import useEditorContext from "../../hooks/Editor/useEditorContext";
import Lights from "./Lights";
import { SceneElementInformations } from "../../context/EditorContextProvider";

const Scene: FC = () => {
  const { elementsOnScene, currentElement } = useEditorContext();
  const [copiedElement, setCopiedElement] =
    useState<SceneElementInformations>();
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.code === "KeyC") {
        if (currentElement !== undefined) {
          setCopiedElement(currentElement);
        }
      } else if (event.ctrlKey && event.code === "KeyV") {
        // setElementsOnScene()
      }
    };
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Lights />
      <Physics>
        {elementsOnScene?.map((block) => GeometryInstantiator(block))}
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
