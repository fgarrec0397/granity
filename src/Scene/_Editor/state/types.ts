// @ts-ignore
import * as THREE from "three";

export enum ModesAvailable {
    Translate = "translate",
    Rotate = "rotate",
    Scale = "scale",
}

export interface SceneElement {
    id: string;
    meshuuid: string;
    meshId: string;
    name: string;
    component: string;
    isSelected: boolean;
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;
    groupId?: string;
}
