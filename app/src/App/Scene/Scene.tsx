import { useHandleEditor, useIsEditor } from "@app/Editor/_actions/hooks";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { Physics } from "@react-three/rapier";
import { FC } from "react";

import { Lights } from "./components";

const Scene: FC = () => {
    const { isEditor } = useIsEditor();

    useHandleEditor();

    return (
        <Physics paused={isEditor}>
            <Lights />
            {isEditor ? <Editor.Editor /> : <Game.Game />}
        </Physics>
    );
};

export default Scene;
