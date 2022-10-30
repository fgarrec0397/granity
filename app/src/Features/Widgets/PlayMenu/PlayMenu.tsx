import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { Button } from "antd";
import { FC } from "react";

const PlayMenu: FC = () => {
    const { loadScene } = useScenes();

    const handleChanceScene = () => {
        loadScene("test");
    };

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                width: 200,
                height: 200,
                backgroundColor: "white",
                border: "1px solid #f0f0f0",
            }}
        >
            <Button onClick={handleChanceScene}>Change scene</Button>
        </div>
    );
};

export const widget = createWidget({
    component: PlayMenu,
    reducer: null,
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
