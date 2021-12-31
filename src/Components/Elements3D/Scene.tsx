// @ts-ignore
import * as THREE from "three";
import { Physics } from "@react-three/cannon";
import React, { FC, useContext, useRef } from "react";
import Lights from "./Lights";
import CameraControls from "./CameraControls";
import GeometryInstantiator from "../Editor/GeometryInstantiator";
import { EditorContext } from "../../context/EditorContextProvider";

const Scene: FC = () => {
  const { elementsOnScene } = useContext(EditorContext);

  return (
    <>
      {/* <Lights /> */}
      <Physics>
        {elementsOnScene?.map((block) => GeometryInstantiator(block))}
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
