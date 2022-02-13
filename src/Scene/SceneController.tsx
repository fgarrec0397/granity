import { Physics } from "@react-three/cannon";
import CameraControls from "camera-controls";
import React, { FC, useEffect, useState } from "react";
import uidGenerator from "../utils/uidGenerator";
import Cube from "./Editor/components/EditorElements/Geometry/Cube";
import Plane from "./Editor/components/EditorElements/Geometry/Plane";
import { GeometryProps } from "./Editor/components/EditorElements/types";
import { SceneElementInformations } from "./Editor/state/EditorContextProvider";
import useEditorContext from "./Editor/state/hooks/useEditorContext";
import Scene from "./Scene";

interface ComponentsElements {
  [key: string]: FC<GeometryProps>;
}

const Components: ComponentsElements = {
  cube: Cube,
  plane: Plane,
};

const GeometryInstantiator = ({
  component,
  id,
  name,
}: SceneElementInformations): React.ReactNode => {
  if (typeof Components[component] !== "undefined") {
    return React.createElement(Components[component], {
      key: id,
      component,
      name,
    });
  }

  return null;
};

const SceneController: FC = () => {
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
    <Scene>
      {elementsOnScene?.map((block: any) => GeometryInstantiator(block))}
    </Scene>
  );
};

export default SceneController;
