import { Euler, Vector3 } from "@granity/three";

import { Vector3Array } from "../types/threejs";

export default (vector3: Vector3 | Euler): Vector3Array => [vector3.x, vector3.y, vector3.z];
