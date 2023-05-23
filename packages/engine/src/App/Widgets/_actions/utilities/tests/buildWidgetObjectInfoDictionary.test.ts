import {
    widgetsDictionaryTest,
    widgetTestId1,
    widgetTestId2,
} from "@engine/Tests/utilities/widgets/widgetsDictionaryTest";
import { describe } from "vitest";

import { FieldType } from "../../widgetsConstants";
import {
    buildWidgetObjectInfo,
    buildWidgetObjectInfoDictionary,
} from "../buildWidgetObjectInfoDictionary";

describe("buildWidgetObjectInfoDictionary utility", () => {
    describe("buildWidgetObjectInfoDictionary function", () => {
        const widgetsInfoDictionary = buildWidgetObjectInfoDictionary(widgetsDictionaryTest);

        it("should returns an object that has the following shape", () => {
            expect(widgetsInfoDictionary).toMatchObject({
                [widgetTestId1]: {
                    id: widgetTestId1,
                    properties: {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    },
                    options: {},
                },
                [widgetTestId2]: {
                    id: widgetTestId2,
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
                [widgetTestId1]: {},
                [widgetTestId2]: {},
            });
        });
    });

    describe("buildWidgetObjectInfo function", () => {
        const widgetObjectInfo = buildWidgetObjectInfo(widgetsDictionaryTest[widgetTestId1]);

        it("should returns an object with the same id as the given object", () => {
            expect(widgetObjectInfo.id).toBe(widgetsDictionaryTest[widgetTestId1].id);
        });

        describe("passing builderOptions properties should build the widgetsInfoDictionary with the given properties", () => {
            const widgetsInfoDictionaryWithProperties = buildWidgetObjectInfo(
                widgetsDictionaryTest[widgetTestId1],
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
                    fieldType: FieldType.Text,
                    value: "This is my value",
                },
            };
            const widgetsInfoDictionaryWithProperties = buildWidgetObjectInfo(
                widgetsDictionaryTest[widgetTestId1],
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
