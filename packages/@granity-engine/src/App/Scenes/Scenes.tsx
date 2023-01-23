import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@granity-engine/App/Editor/_actions/hooks/useHandleEditor";
import Editor from "@granity-engine/App/Editor/Editor";
import Game from "@granity-engine/App/Game/Game";
import useHandleGetScene from "@granity-engine/App/Scenes/_actions/hooks/useHandleGetScene";
import { FC, Suspense } from "react";

import Lights from "./components/Lights";

const Scenes: FC = () => {
    const { isEditor } = useEditor();

    useHandleEditor();
    useHandleGetScene();

    return (
        <Suspense>
            <Lights />
            {isEditor ? <Editor.Editor /> : <Game.Game />}
        </Suspense>
    );
};

export default Scenes;
