import { useEditorKeyboardControls } from "@app/Core/_actions/hooks";
import { useHandleGetScene, useHandleSaveScene } from "@app/Scene/_actions/hooks";
import { SceneDefaultCamera } from "@app/Scene/components";
import Widgets from "@app/Widgets/Widgets";
import { Debug, Physics } from "@react-three/cannon";
import { FC } from "react";

import EditorUI from "./components/EditorUI/EditorUI";

const Editor: FC = () => {
    useEditorKeyboardControls();
    useHandleGetScene();
    useHandleSaveScene();

    return (
        <Physics isPaused={true}>
            <Debug color="black" scale={1.1}>
                <SceneDefaultCamera />
                <Widgets />
            </Debug>
        </Physics>
    );
};

export default { Editor, EditorUI };
