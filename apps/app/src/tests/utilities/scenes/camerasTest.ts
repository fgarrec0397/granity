import { SceneCamera } from "@app/Scenes/_actions/scenesTypes";
import { uidGenerator } from "helpers-granity";

export const [cameraId1, cameraId2, cameraId3] = [uidGenerator(), uidGenerator(), uidGenerator()];
export const [cameraName1, cameraName2, cameraName3] = ["camera1", "camera2", "camera3"];

export const camerasTestWithIsDefaultToTrue: SceneCamera[] = [
    {
        id: cameraId1,
        name: cameraName1,
        isDefault: false,
        cameraRef: { current: undefined },
        position: [0, 0, 0],
    },
    {
        id: cameraId2,
        name: cameraName2,
        isDefault: true,
        cameraRef: { current: undefined },
        position: [0, 0, 0],
    },
    {
        id: cameraId3,
        name: cameraName3,
        isDefault: false,
        cameraRef: { current: undefined },
        position: [0, 0, 0],
    },
];

export const camerasTestWithoutIsDefaultToTrue: SceneCamera[] = [
    {
        id: cameraId1,
        name: cameraName1,
        isDefault: false,
        cameraRef: { current: undefined },
        position: [0, 0, 0],
    },
    {
        id: cameraId2,
        name: cameraName2,
        isDefault: false,
        cameraRef: { current: undefined },
        position: [0, 0, 0],
    },
    {
        id: cameraId3,
        name: cameraName3,
        isDefault: false,
        cameraRef: { current: undefined },
        position: [0, 0, 0],
    },
];
