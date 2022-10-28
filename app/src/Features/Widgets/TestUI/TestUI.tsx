import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";

const TestUI: FC = () => {
    return (
        <div
            style={{
                position: "absolute",
                bottom: 0,
                width: 200,
                height: 200,
                backgroundColor: "blue",
            }}
        >
            {" "}
            Hello world{" "}
        </div>
    );
};

export const widget = createWidget({
    component: TestUI,
    reducer: null,
    type: WidgetType.UI,
    widgetDefinition: {
        name: "TestUI",
        options: [
            {
                name: "translateXOnPlay",
                displayName: "Translate X on play",
                fieldType: FieldType.Checkbox,
                defaultValue: false,
            },
        ],
    },
});
