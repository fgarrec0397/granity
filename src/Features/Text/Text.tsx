import { Html } from "@react-three/drei";
import React, { FC } from "react";
import { IWidget } from "../../App/Core/_Widgets/typings";
import textReducer from "./state/textReducer";

export interface TextProps {
    text: string;
}

type OwnProps = TextProps;

const Text: FC<OwnProps> = ({ text }) => {
    return (
        <mesh>
            <Html>
                <div>
                    <p>{text}</p>
                </div>
            </Html>
        </mesh>
    );
};

export const widget: IWidget<TextProps> = {
    component: Text,
    reducer: textReducer,
    widgetDefinition: {
        name: "Text",
        options: [
            {
                name: "text",
                displayName: "Text",
                fieldType: "Text",
                defaultValue: "Test default value",
            },
        ],
    },
};
