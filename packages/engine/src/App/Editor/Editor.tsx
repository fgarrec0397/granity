import SceneDefaultCamera from "@engine/App/Scenes/components/SceneDefaultCamera";
import Widgets from "@engine/App/Widgets/Widgets";
import { Grid, Select } from "@granity/three/drei";
import { FC } from "react";

import useHandleLoadFiles from "../Core/_actions/hooks/useHandleLoadFiles";
import useGameWidgets from "../Game/_actions/hooks/useGameWidgets";
import GamePhysics from "../Game/Components/GamePhysics";
import { useEditor } from "./_actions/hooks";
import useEditorInputs from "./_actions/hooks/useEditorInputs";
import useHandleEditorStateChange from "./_actions/hooks/useHandleEditorStateChange";
import EditorLayout from "./components/EditorLayout";

const Editor: FC = () => {
    const { gameWidgetsIds, selectGameWidgetFromMeshArr } = useGameWidgets();
    const { isDebugEnabled } = useEditor();

    useHandleLoadFiles();
    useEditorInputs();
    useHandleEditorStateChange();

    return (
        <GamePhysics paused debug>
            <Select multiple onChange={selectGameWidgetFromMeshArr}>
                <SceneDefaultCamera />
                <Widgets widgetsIds={gameWidgetsIds} />
                {isDebugEnabled && <Grid infiniteGrid sectionThickness={0.5} />}
            </Select>
        </GamePhysics>
    );
};

export default { Editor, EditorUI: EditorLayout };
