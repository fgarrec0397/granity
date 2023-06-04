import {
    widgetsDictionaryTest,
    widgetTestId1,
    widgetTestId2,
} from "@engine/Tests/utilities/widgets/widgetsDictionaryTest";
import { describe } from "vitest";

import { buildWidgetInfo, buildWidgetInfoDictionary } from "../buildWidgetInfoDictionary";

describe("buildWidgetInfoDictionary utility", () => {
    describe("buildWidgetInfoDictionary function", () => {
        const widgetsInfoDictionary = buildWidgetInfoDictionary(widgetsDictionaryTest);

        it("should returns an object that has the following shape", () => {
            expect(widgetsInfoDictionary).toMatchObject({
                [widgetTestId1]: {
                    id: widgetTestId1,
                    displayName: widgetsDictionaryTest[widgetTestId1].name,
                },
                [widgetTestId2]: {
                    id: widgetTestId2,
                    displayName: widgetsDictionaryTest[widgetTestId2].name,
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

    describe("buildWidgetInfo function", () => {
        const widgetObjectInfo = buildWidgetInfo(widgetsDictionaryTest[widgetTestId1]);

        it("should returns an object with the same id as the given object", () => {
            expect(widgetObjectInfo.id).toBe(widgetsDictionaryTest[widgetTestId1].id);
        });
    });
});
