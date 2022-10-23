import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";

import gameControllerReducer from "./_actions/_data/state/gameControllerReducer";
import useGameControllerInit from "./_actions/hooks/useGameControllerInit";
import useGameControllerUpdate from "./_actions/hooks/useGameControllerUpdate";

export type GameControllerProps = EditableWidget;

const GameController: FC<GameControllerProps> = () => {
    useGameControllerInit();
    useGameControllerUpdate();

    return <> Widget Starter </>;
};

export const widget = createWidget({
    component: GameController,
    reducer: gameControllerReducer,
    type: WidgetType.GameObject,
    widgetDefinition: {
        name: "GameController",
    },
});
