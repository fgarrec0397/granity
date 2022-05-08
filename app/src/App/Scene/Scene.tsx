import React, { FC } from "react";
import { Physics } from "@react-three/cannon";
import { Select } from "@react-three/drei";
import { Object3D } from "three";
import Lights from "./components/Lights";
import CameraControls from "./components/CameraControls";
import Widgets from "../Widgets/Widgets";
import useKeyboardControls from "../Core/hooks/useKeyboardControls";
import useWidgets from "../Widgets/state/hooks/useWidgets";
import useWidgetsUtilities from "../Widgets/state/hooks/useWidgetsUtilities";

const Scene: FC = () => {
    const { selectWidget } = useWidgets();
    const { getWidgetByMesh } = useWidgetsUtilities();
    useKeyboardControls();

    const onSelectMesh = (meshArray: Object3D[]) => {
        if (meshArray.length) {
            const { widget } = getWidgetByMesh(meshArray[0]);

            if (widget) {
                selectWidget(widget);
            }
        }
    };

    return (
        <Physics>
            <Lights />
            <CameraControls />
            <Select box multiple onChange={onSelectMesh} filter={(items) => items}>
                <Widgets />
            </Select>
        </Physics>
    );
};

export default Scene;
