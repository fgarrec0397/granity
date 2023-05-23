import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { FC } from "react";

import GamePhysics from "./GamePhysics";

const Game: FC = () => {
    const { widgetsIds } = useWidgets();

    // TODO Implement a setting to activate the Debug through the editor
    return (
        <GamePhysics debug>
            <Widgets widgetsIds={widgetsIds} />
        </GamePhysics>
    );
};

const GameUI: FC = () => {
    // const { widgetsUIIds } = useWidgets();
    console.log("UI is temporarily down");

    return null;
    // return <Widgets widgetsIds={widgetsUIIds} />;
};

export default { Game, GameUI };
