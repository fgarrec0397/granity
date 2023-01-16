import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";
import UIClosePreviewButton from "./Components/UIClosePreviewButton";

const UI: FC = () => {
    const { showEditorUI, showGameUI, isGameUIPreview } = useUI();

    // TODO - see if we put UIClosePreviewButton in the Editor module
    return (
        <>
            {showEditorUI && <Editor.EditorUI />}
            {showGameUI && <Game.GameUI />}
            {isGameUIPreview && <UIClosePreviewButton />}
        </>
    );
};

export default UI;
