import {
    SerializedWidgetDictionary,
    WidgetInfoDictionary,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Dictionary, Vector3Array } from "@granity/helpers";
import { Camera } from "@granity/three/fiber";
import { MutableRefObject } from "react";

// --------------- Cameras types --------------- //

export type SceneCameraRef = MutableRefObject<
    | (Camera & {
          manual?: boolean | undefined;
      })
    | undefined
>;

export type SceneCamera = {
    id: string;
    name: string;
    isDefault?: boolean;
    cameraRef: SceneCameraRef;
    position: Vector3Array;
};

// --------------- Scenes types --------------- //

/**
 * A dictionary containing informations about scenes
 */
export type ScenesDictionary = Dictionary<ScenesDictionaryItem>;

/**
 * A single scene information
 */
export type ScenesDictionaryItem = {
    id: string;
    name: string;
    isDefault: boolean;
    data: SceneData;
};

/**
 * All data of a scene object
 */
export type SceneData = {
    serializedWidgets: SerializedWidgetDictionary;
    widgetsObjectInfoDictionary: WidgetInfoDictionary;
};

/**
 * Scene Services Parameters
 */
export type SaveSceneServiceParameter = ScenesDictionary;
