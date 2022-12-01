import { widgetsModulesTest } from "@tests/utilities/widgets/widgetsModulesTest";

import mapWidgetModuleToWidgetDictionary from "../mapWidgetModuleToWidgetDictionary";

describe("mapWidgetModuleToWidgetDictionary utility", () => {
    const widgetDictionary = mapWidgetModuleToWidgetDictionary(widgetsModulesTest);

    it("should returns an object with an id property", () => {
        expect(widgetDictionary).toHaveProperty("id");
    });

    it("should returns an object with an id property that is equal to an empty string", () => {
        expect(widgetDictionary.id).toBe("");
    });
});
