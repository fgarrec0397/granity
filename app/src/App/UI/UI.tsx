import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";
import UIClosePreviewButton from "./Components/UIClosePreviewButton";

const UI: FC = () => {
    const { showEditorUI, showGameUI, isGameUIPreview } = useUI();

    return (
        <>
            {showEditorUI && <Editor.EditorUI />}
            {showGameUI && <Game.GameUI />}
            {isGameUIPreview && <UIClosePreviewButton />}
        </>
    );
};

export default UI;
