import { Html } from "@react-three/drei";
import { FC } from "react";

import { FieldType, WidgetModule } from "../../../App/Widgets/_actions/widgetsTypes";
import textReducer from "./state/textReducer";

const Text: FC = () => {
    return (
        <mesh>
            <Html>
                <div>
                    <p>Text 2</p>
                </div>
            </Html>
        </mesh>
    );
};

export const widget: WidgetModule = {
    component: Text,
    reducer: textReducer,
    widgetDefinition: {
        name: "Text2",
        options: [
            {
                name: "text",
                displayName: "Text",
                fieldType: FieldType.Text,
                defaultValue: "Test default value",
            },
        ],
    },
};
