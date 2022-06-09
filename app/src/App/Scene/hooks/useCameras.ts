import { useCallback } from "react";
import { SceneCamera } from "../types";
import useCamerasContext from "./core/useCamerasContext";

export default () => {
    const { cameras, setCameras } = useCamerasContext();

    const addCamera = useCallback(
        (cameraRef: SceneCamera) => {
            setCameras((prevCameras) => [...prevCameras, cameraRef]);
        },
        [setCameras]
    );

    const deleteCamera = () => {};

    return {
        cameras,
        addCamera,
        deleteCamera,
    };
};
