import { FC } from "react";
import { EditableWidget } from "../../App/Editor/types";
import { WidgetModule } from "../../App/Widgets/types";
import PlayerCamera from "./components/PlayerCamera";

export type PlayerProps = EditableWidget;

type OwnProps = PlayerProps;

const Player: FC<OwnProps> = () => {
    return <PlayerCamera />;
};

export const widget: WidgetModule<PlayerProps> = {
    component: Player,
    reducer: null,
    widgetDefinition: {
        name: "Player",
    },
};
