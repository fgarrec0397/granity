// @ts-ignore
import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import React, { FC, useContext, useRef } from "react";
import EditableMesh from "../EditableMesh";
import { EditorContext } from "../../../context/EditorContextProvider";
import { GeometryProps } from "./types";

const Plane: FC<GeometryProps> = () => {
  const name = "plane1";
  const { isEditor } = useContext(EditorContext);
  const ref = useRef<THREE.Mesh>();
  const [physicRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <EditableMesh
      geometryRef={isEditor ? ref : physicRef}
      rotation={[-Math.PI / 2, 0, 0]}
      name={name}
    >
      <planeGeometry attach="geometry" args={[10, 10]} />
    </EditableMesh>
  );
};

export default Plane;
