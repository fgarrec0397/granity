import { useHandleEditor, useIsEditor } from "@app/Editor/_actions/hooks";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import Widgets from "@app/Widgets/Widgets";
import { Physics } from "@react-three/cannon";
import { FC } from "react";

import { Lights, SceneDefaultCamera } from "./components";

const Scene: FC = () => {
    const { isEditor } = useIsEditor();

    useHandleEditor();

    return (
        <>
            <Lights />
            <Physics isPaused={isEditor}>
                <SceneDefaultCamera />
                <Widgets />
            </Physics>
        </>
    );
    // {isEditor ? <Editor.Editor /> : <Game.Game />}
};

export default Scene;
