import UIWidgets from "@engine/App/UI/Components/UIWidgets";
import { FC, useEffect, useState } from "react";

import GamePhysics from "./GamePhysics";
import GameWidgets from "./GameWidgets";

const Game: FC = () => {
    const [isGamePhysicsPaused, setIsGamePhysicsPaused] = useState(true);

    useEffect(() => {
        // TODO - Fix that. It ensures the scene is mounted before the physics is applied
        setTimeout(() => {
            setIsGamePhysicsPaused(false);
        }, 1000);
    }, []);

    // TODO Implement a setting to activate the Debug through the editor
    return (
        <GamePhysics paused={isGamePhysicsPaused} debug>
            <GameWidgets />
        </GamePhysics>
    );
};

const GameUI: FC = () => {
    return <UIWidgets />;
};

export default { Game, GameUI };
