import React, { FC, useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Core/_Widgets/Widgets";
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
