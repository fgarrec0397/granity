import { useGameKeyboardControls } from "@app/Core/_actions/hooks";
import { Physics } from "@react-three/cannon";
import Widgets from "@widgets/Widgets";
import { FC } from "react";

const Game: FC = () => {
    useGameKeyboardControls();

    return (
        <>
            <Physics gravity={[0, -30, 0]}>
                <Widgets />
            </Physics>
        </>
    );
};

const GameUI: FC = () => {
    return null;
};

export default { Game, GameUI };
