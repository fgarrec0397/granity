// @ts-ignore
import * as THREE from "three";
import React, { FC, useRef } from "react";
import { GeometryBoxProps } from "../types";
import EditableMesh from "../../EditableMesh";

const Cube: FC<GeometryBoxProps> = ({ name, component }) => {
  const ref = useRef<THREE.Mesh>();

  return (
    <EditableMesh geometryRef={ref} name={name} component={component}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
    </EditableMesh>
  );
};

export default Cube;
