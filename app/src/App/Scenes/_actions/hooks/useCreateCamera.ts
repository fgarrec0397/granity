import useForwardedRef from "@app/Common/hooks/useForwardedRef";
import { useThree } from "@react-three/fiber";
import { ForwardedRef, MutableRefObject, useEffect } from "react";
import { PerspectiveCamera } from "three";

import { SceneCameraRef } from "../scenesTypes";
import useCameras from "./useCameras";

/**
 * Create a new camera and add it to the CamerasContext.
 */
export default (
    cameraName: string,
    ref?: MutableRefObject<PerspectiveCamera> | ForwardedRef<PerspectiveCamera>
) => {
    const camera = useThree((state) => state.camera);
    const { addCamera, removeCamera, setCurrentCamera } = useCameras();
    const cameraRef = useForwardedRef(ref) as SceneCameraRef;

    useEffect(() => {
        const newCamera = addCamera(cameraRef, cameraName);
        setCurrentCamera(newCamera.id);

        return () => {
            removeCamera(newCamera?.id);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        camera,
        cameraRef,
    };
};
