import React, { FC } from "react";
import Cube, { CubeGeometryProps } from "../Geometry/Cube";

export interface GeometryElementDefinition {
  uid: string;
  component: string;
  name: string;
}

interface ComponentsElements {
  [key: string]: FC<CubeGeometryProps>;
}

const Components: ComponentsElements = {
  cube: Cube,
};

export default ({
  component,
  uid,
  name,
}: GeometryElementDefinition): React.ReactNode => {
  if (typeof Components[component] !== "undefined") {
    return React.createElement(Components[component], {
      key: uid,
      name,
    });
  }

  return null;
};
