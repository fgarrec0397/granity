// @ts-ignore
import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import React, { FC, useContext, useRef } from "react";
import EditableMesh from "../EditableMesh";
import { EditorContext } from "../../../context/EditorContextProvider";
import { GeometryProps } from "./types";

const Cube: FC<GeometryProps> = ({ name }) => {
  const ref = useRef<THREE.Mesh>();
  const { isEditor } = useContext(EditorContext);
  const [physicRef] = useBox(() => ({
    mass: 1,
    position: [0, 20, 0],
  }));

  return (
    <EditableMesh geometryRef={isEditor ? ref : physicRef} name={name}>
      <boxGeometry attach="geometry" args={[10, 10, 10]} />
    </EditableMesh>
  );
};

export default Cube;
