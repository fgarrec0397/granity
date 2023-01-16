import { uidGenerator } from "@granity/helpers";

import { ScenesDictionary } from "../../scenesTypes";
import getDefaultSceneId from "../getDefaultSceneId";

describe("getDefaultSceneId utility", () => {
    it("should return the id of a scene object with isDefault to true", () => {
        const sceneId1 = uidGenerator();
        const sceneId2 = uidGenerator();

        const scenes: ScenesDictionary = {
            sceneId1: {
                id: sceneId1,
                name: "scene1",
                isDefault: false,
                data: {
                    serializedWidgets: {},
                    widgetsObjectInfoDictionary: {},
                },
            },
            sceneId2: {
                id: sceneId2,
                name: "scene2",
                isDefault: true,
                data: {
                    serializedWidgets: {},
                    widgetsObjectInfoDictionary: {},
                },
            },
        };

        const defaultSceneId = getDefaultSceneId(scenes);

        expect(scenes[defaultSceneId].isDefault).toEqual(true);
    });

    it("should return the first scene object when there is not any camera object with isDefault to true", () => {
        const sceneId1 = uidGenerator();
        const sceneId2 = uidGenerator();

        const scenes: ScenesDictionary = {
            sceneId1: {
                id: sceneId1,
                name: "scene1",
                isDefault: false,
                data: {
                    serializedWidgets: {},
                    widgetsObjectInfoDictionary: {},
                },
            },
            sceneId2: {
                id: sceneId2,
                name: "scene2",
                isDefault: false,
                data: {
                    serializedWidgets: {},
                    widgetsObjectInfoDictionary: {},
                },
            },
        };

        const defaultSceneId = getDefaultSceneId(scenes);

        expect(scenes[defaultSceneId].name).toEqual("scene1");
    });
});
