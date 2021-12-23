import React, { FC } from "react";
import Cube from "./Geometry/Cube";
import Plane from "./Geometry/Plane";
import { GeometryProps } from "./Geometry/types";

export interface GeometryElementDefinition {
  uid: string;
  component: string;
  name: string;
}

interface ComponentsElements {
  [key: string]: FC<GeometryProps>;
}

const Components: ComponentsElements = {
  cube: Cube,
  plane: Plane,
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
