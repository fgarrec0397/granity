import { useGameKeyboardControls } from "@app/Core/_actions/hooks";
import { Debug, Physics } from "@react-three/cannon";
import Widgets from "@widgets/Widgets";
import { FC } from "react";

const Game: FC = () => {
    useGameKeyboardControls();

    return (
        <>
            <Physics gravity={[0, -30, 0]}>
                <Debug color="black" scale={1.1}>
                    <Widgets />
                </Debug>
            </Physics>
        </>
    );
};

const GameUI: FC = () => {
    return null;
};

export default { Game, GameUI };
