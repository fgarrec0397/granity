import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@engine/App/Editor/_actions/hooks/useHandleEditor";
import Editor from "@engine/App/Editor/Editor";
import { GamePreview, useHandleGameStart } from "@engine/App/Game";
import { FC } from "react";

import useHandleInitScenes from "./_actions/hooks/useHandleInitScenes";

const Scenes: FC = () => {
    const { isEditor, isGamePreview, isPreview, isUIPreview } = useEditor();

    useHandleEditor();
    useHandleGameStart();
    useHandleInitScenes();

    if (isEditor || isPreview || isUIPreview) {
        return <Editor.Editor />;
    }

    if (isGamePreview) {
        return <GamePreview.Game />;
    }

    return null;
};

export default Scenes;
