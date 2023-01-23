import { widgetsModulesTest } from "@granity-engine/Tests/utilities/widgets/widgetsModulesArrayTest";

import filterWidgetsModules from "../filterWidgetsModules";

describe("filterWidgets utility", () => {
    const filteredWidgetsModules = filterWidgetsModules(widgetsModulesTest);

    it("should returns an object that constains two widgetsObjects", () => {
        expect(filteredWidgetsModules.widgetsObjectModules.length).toBe(2);
    });

    test("widgetsUI objects should not have hasRef property", () => {
        expect(filteredWidgetsModules.widgetsUIModules.some((x) => (x as any).hasRef)).toBe(false);
    });
});
