import useEditor from "@granity/engine/App/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@granity/engine/App/Editor/_actions/hooks/useHandleEditor";
import Editor from "@granity/engine/App/Editor/Editor";
import { GamePreview } from "@granity/engine/App/Game";
import { FC, Suspense } from "react";

import Lights from "./Lights";

const Scene: FC = () => {
    const { isEditor } = useEditor();

    useHandleEditor();

    return (
        <Suspense>
            <Lights />
            {isEditor ? <Editor.Editor /> : <GamePreview.Game />}
        </Suspense>
    );
};

export default Scene;
