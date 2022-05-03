import React, { FC } from "react";
import { Physics } from "@react-three/cannon";
import { Select } from "@react-three/drei";
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
            <Select />
            <Widgets />
        </Physics>
    );
};

export default Scene;
