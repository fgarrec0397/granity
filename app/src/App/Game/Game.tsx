import { useGameKeyboardControls } from "@app/Core/_actions/hooks";
import Widgets from "@widgets/Widgets";
import { FC } from "react";

const Game: FC = () => {
    useGameKeyboardControls();

    return <Widgets />;
};

const GameUI: FC = () => {
    return null;
};

export default { Game, GameUI };
