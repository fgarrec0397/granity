import React, { FC } from "react";
import { SceneElementInformations } from "../../context/EditorContextProvider";
import Cube from "./EditorElements/Geometry/Cube";
import Plane from "./EditorElements/Geometry/Plane";
import { GeometryProps } from "./EditorElements/types";

interface ComponentsElements {
  [key: string]: FC<GeometryProps>;
}

const Components: ComponentsElements = {
  cube: Cube,
  plane: Plane,
};

export default ({
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
