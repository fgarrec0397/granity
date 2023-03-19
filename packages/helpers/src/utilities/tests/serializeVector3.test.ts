import { Vector3 } from "@granity/three/src/Three";

import serializeVector3 from "../serializeVector3";

describe("Serialize a Vector3 into an array of number representing the X, Y and Z coordinate", () => {
    test("Transform a 0, 0, 0 Vector3 coordinates into [0, 0, 0] array ", () => {
        expect(serializeVector3(new Vector3(0, 0, 0))).toStrictEqual([0, 0, 0]);
    });

    test("The array lenght should always be 3", () => {
        expect(serializeVector3(new Vector3(15, 2000, -30))).toHaveLength(3);
    });
});
