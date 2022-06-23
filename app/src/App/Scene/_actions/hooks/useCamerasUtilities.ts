import { useCallback } from "react";

import { useCamerasContext } from "../_data/hooks";

export default () => {
    const { cameras, currentCameraIndex, setCurrentCameraIndex } = useCamerasContext();

    /**
     *
     * @param getPrev Set this to true to get the previous camera
     * @returns The next camera in the list
     */
    const getNextCamera = useCallback(
        (getPrev = false) => {
            const nextCameraIndex = getPrev ? currentCameraIndex - 1 : currentCameraIndex + 1;

            if (!getPrev && nextCameraIndex > cameras.length - 1) {
                setCurrentCameraIndex(0);
                return cameras[0].cameraRef as any;
            }

            if (getPrev && nextCameraIndex < 0) {
                setCurrentCameraIndex(cameras.length - 1);
                return cameras[cameras.length - 1].cameraRef as any;
            }

            setCurrentCameraIndex(nextCameraIndex);
            return cameras[nextCameraIndex].cameraRef as any;
        },
        [cameras, currentCameraIndex, setCurrentCameraIndex]
    );

    return { getNextCamera };
};
