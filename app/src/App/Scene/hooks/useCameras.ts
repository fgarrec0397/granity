import { SceneCamera } from "../types";
import useCamerasContext from "./core/useCamerasContext";

export default () => {
    const { cameras, setCameras } = useCamerasContext();

    const addCamera = (cameraRef: SceneCamera) => {
        setCameras([...cameras, cameraRef]);
    };

    const deleteCamera = () => {};

    return {
        cameras,
        addCamera,
        deleteCamera,
    };
};
