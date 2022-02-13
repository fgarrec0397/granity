import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import CameraControls from "./components/CameraControls";
import Lights from "./components/Lights";

const Scene: FC = ({ children }) => {
  return (
    <>
      <Lights />
      <Physics>
        {children}
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
