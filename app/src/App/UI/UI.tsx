import { useIsEditor } from "@app/Editor/_actions/hooks";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { FC } from "react";

const UI: FC = () => {
    const { isEditor } = useIsEditor();

    return <>{isEditor ? <Editor.EditorUI /> : <Game.GameUI />}</>;
};

export default UI;
