import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import Lights from "../Components/Elements3D/Lights";

const Scene: FC = ({ children }) => {
  return (
    <>
      <Lights />
      <Physics>
        {children}
        {/* <CameraControls /> TODO - fix the import */}
      </Physics>
    </>
  );
};

export default Scene;
