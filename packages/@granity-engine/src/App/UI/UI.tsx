import Editor from "@granity-engine/App/Editor/Editor";
import { GamePreview } from "@granity-engine/App/Game/Components";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";
import UIClosePreviewButton from "./Components/UIClosePreviewButton";

const UI: FC = () => {
    const { showEditorUI, showGameUI, isGameUIPreview } = useUI();

    // TODO - see if we put UIClosePreviewButton in the Editor module
    return (
        <>
            {showEditorUI && <Editor.EditorUI />}
            {showGameUI && <GamePreview.GameUI />}
            {isGameUIPreview && <UIClosePreviewButton />}
        </>
    );
};

export default UI;
