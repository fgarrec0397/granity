import { Html } from "@react-three/drei";
import React, { FC } from "react";
import { FieldType, IWidget } from "../../App/Widgets/types";
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

export const widget: IWidget = {
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
