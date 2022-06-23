import { Camera } from "@react-three/fiber";
import { MutableRefObject } from "react";

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
