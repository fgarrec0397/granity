import { uidGenerator } from "@granity/helpers";
import { MutableRefObject } from "react";

import { SceneCamera } from "../../scenesTypes";
import getCameraRef from "../getCameraRef";

describe("getCameraRef utility", () => {
    const testSceneCamera: SceneCamera = {
        id: uidGenerator(),
        name: "test",
        cameraRef: {
            current: undefined,
        },
        position: [0, 0, 0],
    };

    const basicRef: MutableRefObject<any> = {
        current: undefined,
    };

    it("should return an object of type RefObject containing at least one property called current", () => {
        const cameraRef = getCameraRef(testSceneCamera);

        expect(cameraRef).toMatchObject(basicRef);
    });
});
