import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import Ground from "./Ground";
import Lights from "./Lights";
import CameraControls from "./CameraControls";
import Cube from "../Geometry/Cube";

const Scene: FC = () => {
  return (
    <>
      <Lights />
      <Physics>
        <Cube />
        <Ground />
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
