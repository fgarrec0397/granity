import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { Camera, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";
import useIsEditor from "../../App/Editor/state/hooks/useIsEditor";
import { EditableWidget } from "../../App/Editor/types";
import { WidgetModule } from "../../App/Widgets/types";

export type CamerasProps = EditableWidget;

type OwnProps = CamerasProps;

const Cameras: FC<OwnProps> = () => {
    const { isEditor } = useIsEditor();
    const camera = useRef<any>();
    const setThree = useThree(({ set }) => set);
    useEffect(() => {
        setTimeout(() => {
            if (camera !== null && camera.current) {
                setThree(() => ({
                    camera: camera.current,
                }));
            }
        }, 1000);
    }, [setThree]);

    useHelper(camera, CameraHelper);

    return (
        <mesh scale={[0.25, 0.25, 0.25]}>
            <boxGeometry />
            <PerspectiveCamera ref={camera} />
        </mesh>
    );
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    widgetDefinition: {
        name: "Cameras",
    },
};
