import { MutableRefObject } from "react";
import { Camera } from "@react-three/fiber";

export type SceneCameraRef = MutableRefObject<
    | (Camera & {
          manual?: boolean | undefined;
      })
    | undefined
>;

export type SceneCamera = {
    cameraRef: SceneCameraRef;
    isActive?: boolean;
};
