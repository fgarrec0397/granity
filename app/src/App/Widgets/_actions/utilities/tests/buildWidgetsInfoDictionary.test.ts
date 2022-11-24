import { uidGenerator } from "@app/Common/utilities";
import TestWidgetComponent from "@tests/TestWidgetComponent";
import { describe } from "vitest";

import { FieldType, WidgetType } from "../../widgetsConstants";
import { WidgetDictionary } from "../../widgetsTypes";
import {
    buildWidgetInfoDictionaryItem,
    buildWidgetsInfoDictionary,
} from "../buildWidgetsInfoDictionary";

describe("buildWidgetsInfoDictionary utility", () => {
    const widgetId1 = uidGenerator();
    const widgetId2 = uidGenerator();

    const widgetsDictionary: WidgetDictionary = {
        [widgetId1]: {
            component: TestWidgetComponent,
            id: widgetId1,
            hasRef: true,
            type: WidgetType.GameObject,
            widgetDefinition: {
                name: "widget1",
            },
        },
        [widgetId2]: {
            component: TestWidgetComponent,
            id: widgetId2,
            hasRef: true,
            type: WidgetType.GameObject,
            widgetDefinition: {
                name: "widget2",
            },
        },
    };

    describe("buildWidgetsInfoDictionary function", () => {
        const widgetsInfoDictionary = buildWidgetsInfoDictionary(widgetsDictionary);

        it("should returns an object that has the following shape", () => {
            expect(widgetsInfoDictionary).toMatchObject({
                [widgetId1]: {
                    id: widgetId1,
                    properties: {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    },
                    options: {},
                },
                [widgetId2]: {
                    id: widgetId2,
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
                [widgetId1]: {},
                [widgetId2]: {},
            });
        });
    });

    describe("buildWidgetInfoDictionaryItem function", () => {
        const widgetsInfoDictionaryItem = buildWidgetInfoDictionaryItem(
            widgetsDictionary[widgetId1]
        );

        it("should returns an object with the same id as the given object", () => {
            expect(widgetsInfoDictionaryItem.id).toBe(widgetsDictionary[widgetId1].id);
        });

        describe("passing builderOptions properties should build the widgetsInfoDictionary with the given properties", () => {
            // TODO - Do the same thing with the options
            const widgetsInfoDictionaryWithProperties = buildWidgetInfoDictionaryItem(
                widgetsDictionary[widgetId1],
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
            const widgetsInfoDictionaryWithProperties = buildWidgetInfoDictionaryItem(
                widgetsDictionary[widgetId1],
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

    // describe("buildWidgetInfoDictionaryOptions function")
});
