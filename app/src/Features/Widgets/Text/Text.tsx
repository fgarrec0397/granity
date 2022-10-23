import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { Html } from "@react-three/drei";
import { FC } from "react";

import { EditableWidget } from "../../../App/Editor/_actions/editorTypes";
import { FieldType, WidgetType } from "../../../App/Widgets/_actions/widgetsConstants";
import textReducer from "./state/textReducer";

export interface TextProps extends EditableWidget {
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

export const widget = createWidget({
    component: Text,
    reducer: textReducer,
    type: WidgetType.GameObject,
    widgetDefinition: {
        name: "Text",
        options: [
            {
                name: "text",
                displayName: "Text",
                fieldType: FieldType.Text,
                defaultValue: "Test default value",
            },
        ],
    },
});
