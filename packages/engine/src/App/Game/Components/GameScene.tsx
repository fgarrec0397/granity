import useHandleInitScenes from "@engine/App/Scenes/_actions/hooks/useHandleInitScenes";
import { useWidgets } from "@engine/App/Widgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

import { useHandleGameStart } from "../_actions/hooks";
import GamePhysics from "./GamePhysics";

const GameScene: FC = () => {
    const { widgetsIds } = useWidgets();

    useHandleInitScenes("publishedScenes");
    useHandleGameStart();

    return (
        <GamePhysics>
            <Widgets widgetsIds={widgetsIds} />
        </GamePhysics>
    );
};

export default GameScene;
