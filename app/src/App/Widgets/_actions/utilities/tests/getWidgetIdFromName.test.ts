import object3DTestObject from "@tests/utilities/object3DTestObject";

import getWidgetIdFromName from "../getWidgetIdFromName";

describe("getWidgetIdFromName utility", () => {
    const widgetId = getWidgetIdFromName(object3DTestObject);

    it("should returns a string", () => {
        expect(typeof widgetId).toBe("string");
    });

    it("should returns a non empty string", () => {
        expect(widgetId).not.toBe("");
    });
});
