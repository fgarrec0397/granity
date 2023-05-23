import { uidGenerator } from "@granity/helpers";

import { ScenesDictionary } from "../../scenesTypes";
import getFirstNonDefaultScene from "../getFirstNonDefaultScene";

describe("getFirstNonDefaultScene utility", () => {
    it("should return a scene object with name equal to scene2", () => {
        const sceneId1 = uidGenerator();
        const sceneId2 = uidGenerator();

        const scenes: ScenesDictionary = {
            sceneId1: {
                id: sceneId1,
                name: "scene1",
                isDefault: true,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                },
            },
            sceneId2: {
                id: sceneId2,
                name: "scene2",
                isDefault: false,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                },
            },
        };

        const defaultScene = getFirstNonDefaultScene(scenes);

        expect(defaultScene.name).toEqual("scene2");
    });

    it("should return a scene object with isDefault to false", () => {
        const sceneId1 = uidGenerator();
        const sceneId2 = uidGenerator();

        const scenes: ScenesDictionary = {
            sceneId1: {
                id: sceneId1,
                name: "scene1",
                isDefault: true,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                },
            },
            sceneId2: {
                id: sceneId2,
                name: "scene2",
                isDefault: false,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                },
            },
        };

        const defaultScene = getFirstNonDefaultScene(scenes);

        expect(defaultScene.isDefault).toEqual(false);
    });
});
