import { SceneCamera } from "../scenesTypes";

export default (camera: SceneCamera) => {
    const { cameraRef } = camera;

    return cameraRef;
};
