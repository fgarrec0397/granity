import { Physics } from "@react-three/cannon";
import React, { FC, useEffect, useState } from "react";
import CameraControls from "./CameraControls";
import GeometryInstantiator from "../Editor/GeometryInstantiator";
import useEditorContext from "../../hooks/Editor/useEditorContext";
import Lights from "./Lights";
import { SceneElementInformations } from "../../context/EditorContextProvider";
import uidGenerator from "../../utils/uidGenerator";

const Scene: FC = () => {
  const { elementsOnScene, currentElement, setElementsOnScene } =
    useEditorContext();
  const [copiedElement, setCopiedElement] =
    useState<SceneElementInformations>();

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
  }, [currentElement]);

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.ctrlKey && event.code === "KeyC") {
      if (currentElement) {
        setCopiedElement(currentElement);
      }
    } else if (event.ctrlKey && event.code === "KeyV") {
      if (setElementsOnScene && copiedElement !== undefined) {
        const possiblyElementsOnScene = elementsOnScene || [];
        const numberOfElementsByType = possiblyElementsOnScene.filter(
          (x) => x.component === copiedElement.component
        ).length;
        const id = uidGenerator();
        const name = `${copiedElement.component}${
          numberOfElementsByType < 10 ? "0" : null
        }${numberOfElementsByType}`;

        setElementsOnScene([
          ...possiblyElementsOnScene,
          {
            ...copiedElement,
            id,
            name,
          },
        ]);
      }
    }
  };

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
