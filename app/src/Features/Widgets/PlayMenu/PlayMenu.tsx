import createWidgetUI from "@app/Widgets/_actions/utilities/createWidgetUI";
import { FieldType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";

const PlayMenu: FC = () => {
    return <> Hello world </>;
};

export const widget = createWidgetUI({
    component: PlayMenu,
    reducer: null,
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
