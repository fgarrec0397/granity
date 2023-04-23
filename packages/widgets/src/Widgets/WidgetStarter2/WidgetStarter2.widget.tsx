import { createWidget, EditableWidget, FieldType, WidgetType } from "@granity/engine";
import { FC } from "react";

import widgetStarter2Reducer from "./_actions/_data/state/widgetStarter2Reducer";
import useWidgetStarter2Init from "./_actions/hooks/useWidgetStarter2Init";
import { Toilet } from "./Toilet";

export type WidgetStarter2Props = EditableWidget & {
    model?: string;
};

const WidgetStarter2: FC<WidgetStarter2Props> = ({ model }) => {
    useWidgetStarter2Init();

    // console.log(model, "model");

    return <Toilet model={model} />;
};

export const widget = createWidget({
    component: WidgetStarter2,
    reducer: widgetStarter2Reducer,
    type: WidgetType.GameObject,
    name: "WidgetStarter2",
    options: [
        {
            name: "model",
            displayName: "3D Model",
            fieldType: FieldType.File,
            defaultValue: "",
        },
    ],
});
