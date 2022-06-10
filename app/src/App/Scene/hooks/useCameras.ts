import { useThree } from "@react-three/fiber";
import { useCallback } from "react";
import { SceneCamera } from "../types";
import useCamerasContext from "./core/useCamerasContext";
import useCamerasUtilities from "./useCamerasUtilities";

export default () => {
    const setThree = useThree((state) => state.set);
    const { getNextCamera } = useCamerasUtilities();
    const { cameras, setCameras } = useCamerasContext();

    const addCamera = useCallback(
        (cameraRef: SceneCamera) => {
            setCameras((prevCameras) => [...prevCameras, cameraRef]);
        },
        [setCameras]
    );

    const setCamera = useCallback(
        (camera: any) => {
            if (camera.current) {
                setThree({ camera: camera.current });
            }
        },
        [setThree]
    );

    const setNextCamera = useCallback(() => {
        const nextCameras = getNextCamera();

        if (nextCameras.current) {
            setThree({ camera: nextCameras.current });
        }
    }, [getNextCamera, setThree]);

    const setPrevCamera = useCallback(() => {
        const prevCameras = getNextCamera(true);

        if (prevCameras.current) {
            setThree({ camera: prevCameras.current });
        }
    }, [getNextCamera, setThree]);

    const deleteCamera = () => {};

    return {
        cameras,
        addCamera,
        setCamera,
        setNextCamera,
        setPrevCamera,
        deleteCamera,
    };
};
