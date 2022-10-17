import SceneDefaultCamera from "@app/Scenes/components/SceneDefaultCamera";
import Widgets from "@app/Widgets/Widgets";
import { FC } from "react";

import useEditorKeyboardControls from "./_actions/hooks/useEditorKeyboardControls";
import useHandleEditorStateChange from "./_actions/hooks/useHandleEditorStateChange";
import EditorUI from "./components/EditorUI/EditorUI";

const Editor: FC = () => {
    useEditorKeyboardControls();
    useHandleEditorStateChange();

    return (
        <>
            <SceneDefaultCamera />
            <Widgets />
        </>
    );
};

export default { Editor, EditorUI };
