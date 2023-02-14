import { createWidget, EditableWidget, WidgetType } from "@granity/engine";
import { FC } from "react";

import widgetStarterReducer from "./_actions/_data/state/widgetStarterReducer";
import useWidgetStarterInit from "./_actions/hooks/useWidgetStarterInit";

export type WidgetStarterProps = EditableWidget;

const WidgetStarter: FC<WidgetStarterProps> = () => {
    useWidgetStarterInit();

    return (
        <mesh position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="pink" />
        </mesh>
    );
};

export const widget = createWidget({
    component: WidgetStarter,
    reducer: widgetStarterReducer,
    type: WidgetType.GameObject,
    name: "WidgetStarter",
});
