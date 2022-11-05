import { Vector3 } from "three/src/Three";

import serializeVector3 from "./serializeVector3";

describe("Serialize a Vector3 into an array of number representing the X, Y and Z coordinate", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(serializeVector3(new Vector3(0, 0, 0))).toStrictEqual([0, 0, 0]);
    });
});
