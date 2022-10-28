import Editor from "@app/Editor/Editor";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import Widgets from "@app/Widgets/Widgets";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";

const UI: FC = () => {
    const { showEditorUI, showGameUI } = useUI();
    const { widgetsUI } = useWidgets();

    if (showEditorUI) {
        return <Editor.EditorUI />;
    }

    if (showGameUI) {
        return <Widgets widgets={widgetsUI} />;
    }

    return null;
};

export default UI;
