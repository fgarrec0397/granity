import { Vector3Array } from "@granity/helpers";
import { useThree } from "@granity/three/src/fiber";
import { useCallback } from "react";

import useCamerasService from "../_data/hooks/useCamerasService";
import { DefaultCameras } from "../scenesConstants";
import { SceneCamera } from "../scenesTypes";

export default () => {
    const setThree = useThree(({ set }) => set);
    const { add, remove, cameras, selectCamera, currentCameraId } = useCamerasService();
    const gameCameras = cameras.filter((x) => x.name !== DefaultCameras.EditorCamera);
    const editorCameras = cameras.filter((x) => x.name === DefaultCameras.EditorCamera);

    const addCamera = useCallback(
        (camera: SceneCamera) => {
            add(camera);

            return camera;
        },
        [add]
    );

    const getCameraById = useCallback(
        (id: string) => {
            return (cameras || []).find((x) => x.id === id);
        },
        [cameras]
    );

    const setCurrentCamera = useCallback(
        (cameraId: string, position?: Vector3Array) => {
            const currentCamera = getCameraById(cameraId);
            selectCamera(cameraId);

            if (currentCamera?.cameraRef.current) {
                if (position) {
                    currentCamera.cameraRef.current.position.set(
                        position[0],
                        position[1],
                        position[2]
                    );
                }
                setThree({ camera: currentCamera.cameraRef.current });
            }
        },
        [selectCamera, setThree, getCameraById]
    );

    const getCameraIndexById = useCallback(
        (id: string) => {
            return cameras.findIndex((x) => x.id === id);
        },
        [cameras]
    );

    const setNextCamera = useCallback(() => {
        const currentCameraIndex = getCameraIndexById(currentCameraId!);

        if (currentCameraId !== null && currentCameraIndex + 1 <= cameras.length - 1) {
            setCurrentCamera(cameras[currentCameraIndex + 1].id);
        }
    }, [cameras, currentCameraId, getCameraIndexById, setCurrentCamera]);

    const setPrevCamera = useCallback(() => {
        const currentCameraIndex = getCameraIndexById(currentCameraId!);

        if (currentCameraId !== null && currentCameraIndex && currentCameraIndex >= 0) {
            setCurrentCamera(cameras[currentCameraIndex - 1].id);
        }
    }, [cameras, currentCameraId, getCameraIndexById, setCurrentCamera]);

    const removeCamera = useCallback(
        (id: string) => {
            remove(id);
        },
        [remove]
    );

    return {
        cameras,
        gameCameras,
        editorCameras,
        addCamera,
        setCurrentCamera,
        setNextCamera,
        setPrevCamera,
        getCameraIndexById,
        removeCamera,
        currentCameraId,
    };
};
