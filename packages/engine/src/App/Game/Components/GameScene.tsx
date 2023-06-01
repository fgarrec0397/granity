import useHandleInitScenes from "@engine/App/Scenes/_actions/hooks/useHandleInitScenes";
import { FC } from "react";

import { useHandleGameStart } from "../_actions/hooks";
import GamePhysics from "./GamePhysics";
import GameWidgets from "./GameWidgets";

const GameScene: FC = () => {
    useHandleInitScenes("publishedScenes");
    useHandleGameStart();

    return (
        <GamePhysics>
            <GameWidgets />
        </GamePhysics>
    );
};

export default GameScene;
