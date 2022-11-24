import { widgetsDictionaryTest } from "@tests/utilities/widgetsDictionaryTest";

import filterWidgets from "../filterWidgets";

describe("filterWidgets utility", () => {
    const filteredWidgets = filterWidgets(widgetsDictionaryTest);

    it("should returns an object that constains two widgetsObjects", () => {
        expect(Object.keys(filteredWidgets.widgetsObjects).length).toBe(2);
    });

    test("widgetsUI objects should not have hasRef property", () => {
        const arrayOfWidgetsUI = Object.keys(filteredWidgets.widgetsUI).map(
            (x) => filteredWidgets.widgetsUI[x]
        );

        expect(arrayOfWidgetsUI.some((x) => (x as any).hasRef)).toBe(false);
    });
});
