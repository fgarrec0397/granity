import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import Ground from "./Ground";
import Lights from "./Lights";
import CameraControls from "./CameraControls";

const Scene: FC = () => {
  return (
    <>
      <Lights />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
