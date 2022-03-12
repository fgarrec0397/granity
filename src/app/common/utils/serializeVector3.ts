import { Euler, Vector3 } from "three";

export default (vector3: Vector3 | Euler): [number, number, number] => [
    vector3.x,
    vector3.y,
    vector3.z,
];
