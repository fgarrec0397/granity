import { SceneCamera } from "../types";

export default (camera: SceneCamera) => {
    const { cameraRef } = camera;

    return cameraRef;
};
