import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@app/Editor/_actions/hooks/useHandleEditor";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import useHandleGetScene from "@app/Scenes/_actions/hooks/useHandleGetScene";
import { FC, Suspense } from "react";

import Lights from "./Lights";

const Scene: FC = () => {
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

export default Scene;
