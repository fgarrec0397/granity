import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";

const UI: FC = () => {
    const { showEditorUI, showGameUI } = useUI();

    if (showEditorUI) {
        return <Editor.EditorUI />;
    }

    if (showGameUI) {
        return <Game.GameUI />;
    }

    return null;
};

export default UI;
