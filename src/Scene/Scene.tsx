import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import CameraControls from "../Components/Elements3D/CameraControls";
import Lights from "../Components/Elements3D/Lights";

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
