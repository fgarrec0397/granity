import { FC } from "react";
import { EditableWidget } from "../../../App/Editor/types";
import { WidgetModule } from "../../../App/Widgets/types";
import GameCamera from "../../Components/Cameras/GameCamera";

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
