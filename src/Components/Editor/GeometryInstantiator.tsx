import React, { FC } from "react";
import Cube from "../Geometry/Cube";

export interface GeometryElementDefinition {
  uid: string;
  component: string;
}

interface ComponentsElements {
  [key: string]: FC;
}

const Components: ComponentsElements = {
  cube: Cube,
};

export default ({
  component,
  uid,
}: GeometryElementDefinition): React.ReactNode => {
  if (typeof Components[component] !== "undefined") {
    return React.createElement(Components[component], {
      key: uid,
    });
  }

  return null;
};
