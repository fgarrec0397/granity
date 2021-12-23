// @ts-ignore
import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import React, { FC, useContext, useRef } from "react";
import EditableMesh from "../Editor/EditableMesh";
import { EditorContext } from "../../context/EditorContextProvider";

export interface CubeGeometryProps {
  name: string;
}

const Cube: FC<CubeGeometryProps> = () => {
  const name = "cube1";
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
