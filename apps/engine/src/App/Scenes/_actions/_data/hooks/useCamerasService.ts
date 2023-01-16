import { useCallback } from "react";

import { SceneCamera } from "../../scenesTypes";
import useCamerasContext from "./useCamerasContext";

export default () => {
    const { cameras, setCameras, setCurrentCameraId, currentCameraId } = useCamerasContext();

    const add = useCallback(
        (camera: SceneCamera) => {
            setCameras((prevCameras) => [...prevCameras, { ...camera }]);
        },
        [setCameras]
    );

    const update = useCallback(
        (camera: SceneCamera) => {
            setCameras((prevCameras) => {
                const cameraIndex = prevCameras.findIndex((x) => x.id === camera.id);
                prevCameras[cameraIndex] = camera;

                return { ...prevCameras };
            });
        },
        [setCameras]
    );

    const selectCamera = useCallback(
        (cameraId: string) => {
            setCurrentCameraId(cameraId);
        },
        [setCurrentCameraId]
    );

    const remove = useCallback(
        (id: string) => {
            setCameras((prevCameras) => {
                return prevCameras.filter((x) => x.id !== id);
            });
        },
        [setCameras]
    );

    return {
        add,
        update,
        remove,
        selectCamera,
        cameras,
        currentCameraId,
    };
};
