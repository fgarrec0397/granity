import {
    gameWidgetsDictionaryTest,
    gameWidgetTestId1,
    gameWidgetTestId2,
} from "@engine/Tests/utilities/widgets/gameWidgetsDictionaryTest";
import { describe } from "vitest";

import { GameOptionsFieldTypes } from "../../gameConstants";
import {
    buildGameWidgetInfo,
    buildGameWidgetInfoDictionary,
} from "../buildGameWidgetInfoDictionary";

describe("buildGameWidgetInfoDictionary utility", () => {
    describe("buildGameWidgetInfoDictionary function", () => {
        const widgetsInfoDictionary = buildGameWidgetInfoDictionary(gameWidgetsDictionaryTest);

        it("should returns an object that has the following shape", () => {
            expect(widgetsInfoDictionary).toMatchObject({
                [gameWidgetTestId1]: {
                    id: gameWidgetTestId1,
                    properties: {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    },
                    options: {},
                },
                [gameWidgetTestId2]: {
                    id: gameWidgetTestId2,
                    properties: {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    },
                    options: {},
                },
            });
        });

        it("should returns an object that has the same ids as properties than the given dictionary", () => {
            expect(widgetsInfoDictionary).toMatchObject({
                [gameWidgetTestId1]: {},
                [gameWidgetTestId2]: {},
            });
        });
    });

    describe("buildGameWidgetInfo function", () => {
        const widgetObjectInfo = buildGameWidgetInfo(gameWidgetsDictionaryTest[gameWidgetTestId1]);

        it("should returns an object with the same id as the given object", () => {
            expect(widgetObjectInfo.id).toBe(gameWidgetsDictionaryTest[gameWidgetTestId1].id);
        });

        describe("passing builderOptions properties should build the widgetsInfoDictionary with the given properties", () => {
            const widgetsInfoDictionaryWithProperties = buildGameWidgetInfo(
                gameWidgetsDictionaryTest[gameWidgetTestId1],
                {
                    properties: {
                        position: [10, 10, 10],
                        rotation: [10, 10, 10],
                        scale: [10, 10, 10],
                    },
                }
            );

            test("properties.position should be [10, 10, 10]", () => {
                expect(widgetsInfoDictionaryWithProperties.properties?.position[0]).toBe(10);
                expect(widgetsInfoDictionaryWithProperties.properties?.position[1]).toBe(10);
                expect(widgetsInfoDictionaryWithProperties.properties?.position[2]).toBe(10);
            });

            test("properties.rotation should be [10, 10, 10]", () => {
                expect(widgetsInfoDictionaryWithProperties.properties?.rotation[0]).toBe(10);
                expect(widgetsInfoDictionaryWithProperties.properties?.rotation[1]).toBe(10);
                expect(widgetsInfoDictionaryWithProperties.properties?.rotation[2]).toBe(10);
            });

            test("properties.scale should be [10, 10, 10]", () => {
                expect(widgetsInfoDictionaryWithProperties.properties?.scale[0]).toBe(10);
                expect(widgetsInfoDictionaryWithProperties.properties?.scale[1]).toBe(10);
                expect(widgetsInfoDictionaryWithProperties.properties?.scale[2]).toBe(10);
            });
        });

        describe("passing builderOptions properties should build the widgetsInfoDictionary with the given properties", () => {
            const builderOptions: any = {
                options: {
                    fieldType: GameOptionsFieldTypes.Text,
                    value: "This is my value",
                },
            };
            const widgetsInfoDictionaryWithProperties = buildGameWidgetInfo(
                gameWidgetsDictionaryTest[gameWidgetTestId1],
                builderOptions
            );

            test("options.fieldType should be 'Text'", () => {
                expect(widgetsInfoDictionaryWithProperties.options?.fieldType).toBe("Text");
            });

            test("options.value should be 'This is my value'", () => {
                expect(widgetsInfoDictionaryWithProperties.options?.value).toBe("This is my value");
            });
        });
    });
});
