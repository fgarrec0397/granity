import { MutableRefObject } from "react";
import { Camera } from "three";

export type SceneCameraRef = MutableRefObject<
    Camera & {
        manual?: boolean | undefined;
    }
>;

export type SceneCamera = {
    cameraRef: SceneCameraRef;
    isActive?: boolean;
};
