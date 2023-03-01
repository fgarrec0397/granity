import { createWidget, WidgetType } from "@granity/engine";
import { Sky as SkyComponent } from "@react-three/drei";
import { FC } from "react";

const Sky: FC = () => {
    return <SkyComponent sunPosition={[10, 5, 10]} />;
};

export const widget = createWidget({
    component: Sky,
    hasRef: true,
    reducer: null,
    type: WidgetType.GameObject,
    name: "Sky",
});
