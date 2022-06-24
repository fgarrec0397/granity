import { BaseApiParameter } from "@app/Core/coreTypes";
import { WidgetSceneObject, WidgetsDictionary } from "@app/Widgets/_actions/widgetsTypes";
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

/**
 * Scene Services Parameters
 */

// export type SceneServiceParameter<> = BaseApiParameter<> & {
//     widgets: WidgetSceneObject[];
//     widgetsDictionary: WidgetsDictionary;
// };

export type SaveSceneServiceParameter = {
    widgets: WidgetSceneObject[];
    widgetsDictionary: WidgetsDictionary;
};

export type GetSceneResponseData = {
    widgets: WidgetSceneObject[];
    widgetsDictionary: WidgetsDictionary;
};
