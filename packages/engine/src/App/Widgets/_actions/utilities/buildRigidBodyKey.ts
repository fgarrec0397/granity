import { Vector3Array } from "@granity/helpers";

/**
 *
 */
export default (
    position: Vector3Array = [0, 0, 0],
    rotation: Vector3Array = [0, 0, 0],
    scale: Vector3Array = [0, 0, 0]
) => {
    return position.concat(rotation).concat(scale).toString();
};
