import { SceneCamera } from "@app/Scene/sceneTypes";

export default (camera: SceneCamera) => {
    const { cameraRef } = camera;

    return cameraRef;
};
