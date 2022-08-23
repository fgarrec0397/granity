import { useEditorKeyboardControls } from "@app/Core/_actions/hooks";
import { SceneDefaultCamera } from "@app/Scene/components";
import Widgets from "@app/Widgets/Widgets";
import { FC } from "react";

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
