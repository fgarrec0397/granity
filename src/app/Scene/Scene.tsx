import React, { FC } from "react";
import { Physics } from "@react-three/cannon";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Widgets/Widgets";
import useKeyboardControls from "../Core/hooks/useKeyboardControls";

const Scene: FC = () => {
    useKeyboardControls();

    return (
        <Physics>
            <Lights />
            <CameraControls />
            <Widgets />
        </Physics>
    );
};

export default Scene;
