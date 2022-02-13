// @ts-ignore
import * as THREE from "three";

export enum ModesAvailable {
    Translate = "translate",
    Rotate = "rotate",
    Scale = "scale",
}

export interface SceneElementInformations {
    id: string;
    name: string;
    component: string;
    position?: THREE.Vector3;
    rotation?: THREE.Vector3;
    scale?: THREE.Vector3;
    mesh?: THREE.Mesh;
}
