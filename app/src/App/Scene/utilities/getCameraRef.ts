import { SceneCamera } from "@scene/types";

export default (camera: SceneCamera) => {
    const { cameraRef } = camera;

    return cameraRef;
};
