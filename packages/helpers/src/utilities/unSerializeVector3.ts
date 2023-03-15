import { Vector3 } from "three";

import { Vector3Array } from "../types";

export default (vector3Array: Vector3Array): Vector3 =>
    new Vector3(vector3Array[0], vector3Array[1], vector3Array[2]);
