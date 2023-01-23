import widgetDictionaryItemTest from "@granity-engine/Tests/utilities/widgets/widgetDictionaryItemTest";

import widgetsConstants from "../../widgetsConstants";
import getWidgetName from "../getWidgetName";

const { widgetObjectsPrefix } = widgetsConstants;

describe("getWidgetName utility", () => {
    const widgetName = getWidgetName(widgetDictionaryItemTest);
    const [prefix, name, id] = widgetName.split("+");

    it("should returns a string", () => {
        expect(typeof widgetName).toBe("string");
    });

    it("should returns a non empty string", () => {
        expect(widgetName).not.toBe("");
    });

    test("first section of the widget name should be equal to the variable widgetObjectsPrefix", () => {
        expect(prefix).toBe(widgetObjectsPrefix);
    });

    test("middle section of the widget name should be equal to the widget definition name", () => {
        expect(name).toBe(widgetDictionaryItemTest.name);
    });

    test("last section of the widget name should be equal to the widget id", () => {
        expect(id).toBe(widgetDictionaryItemTest.id);
    });
});
