import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";

const PlayMenu: FC = () => {
    return <> Hello world </>;
};

export const widget = createWidget({
    component: PlayMenu,
    type: WidgetType.UI,
    widgetDefinition: {
        name: "PlayMenu",
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
