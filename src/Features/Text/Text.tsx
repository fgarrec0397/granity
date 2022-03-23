import { Html } from "@react-three/drei";
import React, { FC } from "react";
import { IWidget } from "../../App/Core/_Widgets/typings";
import textReducer from "./state/textReducer";

const Text: FC = () => {
    return (
        <mesh>
            <Html>
                <div>
                    <p>Text</p>
                </div>
            </Html>
        </mesh>
    );
};

export const widget: IWidget = {
    component: Text,
    reducer: textReducer,
    widgetDefinition: {
        name: "Text",
        options: [
            {
                name: "text",
                displayName: "Text",
                fieldType: "Text",
            },
        ],
    },
};
