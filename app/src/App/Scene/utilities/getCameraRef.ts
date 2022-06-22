import { SceneCamera } from "@scene/sceneTypes";

export default (camera: SceneCamera) => {
    const { cameraRef } = camera;

    return cameraRef;
};
