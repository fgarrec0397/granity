import { Vector3Array } from "@granity/helpers";

import unSerializeVector3 from "../unSerializeVector3";

const vector3Array: Vector3Array = [0, 0, 0];

// Need to find a way to test that unSerializeVector3 returns a Vector3

describe("Unserialize a Vector3Array into an actual Vector3 coordinate", () => {
    const unSerializedVector3Array = unSerializeVector3(vector3Array);

    test("unSerializeVector3 returns value contains X property", () => {
        expect(unSerializedVector3Array.x).toBe(0);
    });
    test("unSerializeVector3 returns value contains Y property", () => {
        expect(unSerializedVector3Array.y).toBe(0);
    });
    test("unSerializeVector3 returns value contains X property", () => {
        expect(unSerializedVector3Array.z).toBe(0);
    });
});
