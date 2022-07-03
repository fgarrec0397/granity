import useKeyboardControls from "@app/Core/_actions/hooks/useKeyboardControls";
import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import { Physics } from "@react-three/cannon";
import Widgets from "@widgets/Widgets";
import { FC } from "react";

import { useHandleGetScene } from "./_actions/hooks";
import useHandleSaveScene from "./_actions/hooks/useHandleSaveScene";
import Lights from "./components/Lights";
import SceneDefaultCamera from "./components/SceneDefaultCamera";

const Scene: FC = () => {
    const { isEditor } = useIsEditor();

    useKeyboardControls();

    useHandleGetScene();

    useHandleSaveScene();

    return (
        <>
            <Physics isPaused={isEditor}>
                <Lights />
                <SceneDefaultCamera />
                <Widgets />
            </Physics>
        </>
    );
};

export default Scene;
