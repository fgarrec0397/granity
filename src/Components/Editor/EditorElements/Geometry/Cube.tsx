// @ts-ignore
import * as THREE from "three";
import React, { FC, useRef } from "react";
import { GeometryProps } from "../types";
import EditableMesh from "../../EditableMesh";

const Cube: FC<GeometryProps> = ({ name }) => {
  const ref = useRef<THREE.Mesh>();

  return (
    <EditableMesh geometryRef={ref} name={name}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
    </EditableMesh>
  );
};

export default Cube;
