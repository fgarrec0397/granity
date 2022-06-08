import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";
import { EditableWidget } from "../../App/Editor/types";
// import GameCamera from "../../App/Scene/components/GameCamera";
import useCamerasContext from "../../App/Scene/hooks/core/useCamerasContext";
import { WidgetModule } from "../../App/Widgets/types";

export type CamerasProps = EditableWidget;

type OwnProps = CamerasProps;

const Cameras: FC<OwnProps> = () => {
    const { cameras, setCameras } = useCamerasContext();
    const three = useThree((state) => ({
        set: state.set,
        camera: state.camera,
    }));
    const cameraRef = useRef(three.camera);
    useEffect(() => {
        setCameras([...cameras, { cameraRef }]);
    }, [cameras, setCameras]);

    useHelper(cameraRef, CameraHelper);
    return null;
    // return <GameCamera />;
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    widgetDefinition: {
        name: "Cameras",
    },
};
