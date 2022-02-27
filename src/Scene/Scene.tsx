import { Physics } from "@react-three/cannon";
import React, { FC } from "react";
import CameraControls from "./components/CameraControls";
import Lights from "./components/Lights";
import SceneController from "./SceneController";

// TODO -- Wrap elements with <Physics></Physics>

const Scene: FC = ({ children }) => {
    return (
        <>
            <Lights />
            {children}
            <CameraControls />
        </>
    );
};

export default Scene;
