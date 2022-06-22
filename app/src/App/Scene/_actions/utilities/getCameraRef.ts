import { SceneCamera } from "../sceneTypes";

export default (camera: SceneCamera) => {
    const { cameraRef } = camera;

    return cameraRef;
};
