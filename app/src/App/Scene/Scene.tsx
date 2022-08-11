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
        <Physics timeStep={isEditor ? 0 : "vary"}>
            <Lights />
            {/* //     <Physics isPaused={isEditor}>
        //         <SceneDefaultCamera />
        //         <Widgets />
        //     </Physics> */}
            {isEditor ? <Editor.Editor /> : <Game.Game />}
        </Physics>
    );
};

export default Scene;
