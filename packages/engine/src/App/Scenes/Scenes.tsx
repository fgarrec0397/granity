import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import useHandleEditor from "@engine/App/Editor/_actions/hooks/useHandleEditor";
import Editor from "@engine/App/Editor/Editor";
import { GamePreview } from "@engine/App/Game";
import { FC } from "react";

import useHandleInitScenes from "./_actions/hooks/useHandleInitScenes";

const Scenes: FC = () => {
    const { isEditor } = useEditor();

    useHandleEditor();
    useHandleInitScenes();

    return <>{isEditor ? <Editor.Editor /> : <GamePreview.Game />}</>;
};

export default Scenes;
