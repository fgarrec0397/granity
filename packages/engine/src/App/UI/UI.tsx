import Editor from "@engine/App/Editor/Editor";
import { GamePreview } from "@engine/App/Game/Components";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";
import UIPreview from "./Components/UIPreview";

const UI: FC = () => {
    const { showEditorUI, showGameUI, showUIPreview } = useUI();

    return (
        <>
            {showEditorUI && <Editor.EditorUI />}
            {showGameUI && <GamePreview.GameUI />}
            {showUIPreview && <UIPreview />}
        </>
    );
};

export default UI;
