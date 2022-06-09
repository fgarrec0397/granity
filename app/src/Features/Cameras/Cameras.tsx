import { FC } from "react";
import { EditableWidget } from "../../App/Editor/types";
import GameCamera from "../../App/Scene/components/GameCamera";
import { WidgetModule } from "../../App/Widgets/types";

export type CamerasProps = EditableWidget;

type OwnProps = CamerasProps;

const Cameras: FC<OwnProps> = () => {
    return <GameCamera />;
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    widgetDefinition: {
        name: "Cameras",
    },
};
