import { useThree } from "@react-three/fiber";
import { useCallback } from "react";
import { SceneCamera } from "@app/Scene/sceneTypes";
import getCameraRef from "@scene/utilities/getCameraRef";
import useCamerasContext from "./core/useCamerasContext";
import useCamerasUtilities from "./useCamerasUtilities";

export default () => {
    const setThree = useThree((state) => state.set);
    const { getNextCamera } = useCamerasUtilities();
    const { cameras, setCameras } = useCamerasContext();

    const addCamera = useCallback(
        (camera: SceneCamera) => {
            setCameras((prevCameras) => [...prevCameras, camera]);
        },
        [setCameras]
    );

    const setCamera = useCallback(
        (camera: SceneCamera) => {
            const cameraRef = getCameraRef(camera);

            if (cameraRef.current) {
                setThree({ camera: cameraRef.current });
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
