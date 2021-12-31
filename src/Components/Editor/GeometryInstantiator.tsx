import React, { FC } from "react";
import Cube from "./EditorElements/Geometry/Cube";
import Plane from "./EditorElements/Geometry/Plane";
import Light from "./EditorElements/Lights/Light";
import { GeometryProps } from "./EditorElements/types";

export interface GeometryElementDefinition {
  uid: string;
  component: string;
  name: string;
  type?: string;
}

interface ComponentsElements {
  [key: string]: FC<GeometryProps>;
}

const Components: ComponentsElements = {
  cube: Cube,
  plane: Plane,
  light: Light,
};

export default ({
  component,
  uid,
  name,
  type,
}: GeometryElementDefinition): React.ReactNode => {
  if (typeof Components[component] !== "undefined") {
    return React.createElement(Components[component], {
      key: uid,
      name,
      type,
    });
  }

  return null;
};
