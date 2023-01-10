import TestWidgetComponent from "@tests/utilities/widgets/TestWidgetComponent";
import { describe } from "vitest";

import { WidgetType } from "../../widgetsConstants";
import { WidgetObjectModule } from "../../widgetsTypes";
import createWidget from "../createWidget";

describe("createWidget utility", () => {
    const widget = createWidget({
        component: TestWidgetComponent,
        reducer: null,
        hasRef: true,
        type: WidgetType.GameObject,
        name: "widget",
    });

    it("should have a component property", () => {
        expect(widget).toHaveProperty("component");
    });

    it("should have a reducer property and it should be null", () => {
        expect(widget).toHaveProperty("reducer");
        expect(widget.reducer).toBe(null);
    });

    it("should have a hasRef property and it should be true", () => {
        expect(widget).toHaveProperty("hasRef");
        expect((widget as WidgetObjectModule).hasRef).toBe(true);
    });

    it("should have a type property and it should be 'GameObject'", () => {
        expect(widget).toHaveProperty("type");
        expect(widget.type).toBe(WidgetType.GameObject);
    });

    it("should have a name property", () => {
        expect(widget).toHaveProperty("name");
        expect(widget.name).toBe("widget");
    });
});