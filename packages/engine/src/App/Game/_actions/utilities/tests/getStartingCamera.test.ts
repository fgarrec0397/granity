import {
    cameraId1,
    cameraId2,
    cameraName2,
    camerasTestWithIsDefaultToTrue,
    camerasTestWithoutIsDefaultToTrue,
} from "@engine/Tests/utilities/scenes/camerasTest";
import { describe, it } from "vitest";

import getStartingCamera from "../getStartingCamera";

describe("getStartingCamera utility", () => {
    describe("Tests with an array of cameras that contains one camera with isDefault to true", () => {
        const cameraTestWithIsDefaultToTrue = getStartingCamera(camerasTestWithIsDefaultToTrue);

        it("should return an object camera with isDefault to true", () => {
            expect(cameraTestWithIsDefaultToTrue.isDefault).toBe(true);
        });

        test("the returned camera object is of type camera", () => {
            expect(cameraTestWithIsDefaultToTrue).toMatchObject(camerasTestWithIsDefaultToTrue[1]);
        });

        test("id property should equal to the cameraId2 variable", () => {
            expect(cameraTestWithIsDefaultToTrue.id).toBe(cameraId2);
        });

        test("name property should equal to the cameraName2 variable", () => {
            expect(cameraTestWithIsDefaultToTrue.name).toBe(cameraName2);
        });

        test("isDefault property is a type of boolean", () => {
            expect(typeof cameraTestWithIsDefaultToTrue.isDefault).toBe("boolean");
        });

        test("cameraRef property is an object with a current property equals to undefined", () => {
            expect(cameraTestWithIsDefaultToTrue.cameraRef.current).toBe(undefined);
        });
    });

    describe("Tests with an array of cameras that contains no camera with isDefault to true", () => {
        const cameraTestWithoutIsDefaultToTrue = getStartingCamera(
            camerasTestWithoutIsDefaultToTrue
        );

        it("should return a camera object with isDefault to false", () => {
            expect(cameraTestWithoutIsDefaultToTrue.isDefault).toBe(false);
        });

        it("should return the first camera object", () => {
            expect(cameraTestWithoutIsDefaultToTrue.id).toBe(cameraId1);
        });
    });
});
