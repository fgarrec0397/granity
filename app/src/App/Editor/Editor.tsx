import { useEditorKeyboardControls } from "@app/Core/_actions/hooks";
import { useHandleGetScene, useHandleSaveScene } from "@app/Scene/_actions/hooks";
import { SceneDefaultCamera } from "@app/Scene/components";
import Widgets from "@app/Widgets/Widgets";
import { FC } from "react";

import EditorUI from "./components/EditorUI/EditorUI";

const Editor: FC = () => {
    useEditorKeyboardControls();
    useHandleGetScene();
    useHandleSaveScene();

    return (
        <>
            <SceneDefaultCamera />
            <Widgets />
        </>
    );
};

export default { Editor, EditorUI };
