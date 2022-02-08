import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import CameraControls from "./CameraControls";
import GeometryInstantiator from "../Editor/GeometryInstantiator";
import useEditorContext from "../../hooks/Editor/useEditorContext";
import Lights from "./Lights";

const Scene: FC = () => {
  const { elementsOnScene } = useEditorContext();

  return (
    <>
      <Lights />
      <Physics>
        {elementsOnScene?.map((block) => GeometryInstantiator(block))}
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
