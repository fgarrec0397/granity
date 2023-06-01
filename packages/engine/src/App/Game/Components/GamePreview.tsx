import UIWidgets from "@engine/App/UI/Components/UIWidgets";
import { FC } from "react";

import GamePhysics from "./GamePhysics";
import GameWidgets from "./GameWidgets";

const Game: FC = () => {
    // TODO Implement a setting to activate the Debug through the editor
    return (
        <GamePhysics debug>
            <GameWidgets />
        </GamePhysics>
    );
};

const GameUI: FC = () => {
    return <UIWidgets />;
};

export default { Game, GameUI };
