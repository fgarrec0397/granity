import SceneDefaultCamera from "@engine/App/Scenes/components/SceneDefaultCamera";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@engine/App/Widgets/Widgets";
import { Physics } from "@granity/physics";
import { Grid, Select } from "@granity/three/drei";
import { FC } from "react";

import useHandleLoadFiles from "../Core/_actions/hooks/useHandleLoadFiles";
import { useEditor } from "./_actions/hooks";
import useEditorInputs from "./_actions/hooks/useEditorInputs";
import useHandleEditorStateChange from "./_actions/hooks/useHandleEditorStateChange";
import EditorLayout from "./components/EditorLayout";

const Editor: FC = () => {
    const { widgetsObjectsIds, selectWidgetFromMeshArr } = useWidgets();
    const { isGridEnabled } = useEditor();

    useHandleLoadFiles();
    useEditorInputs();
    useHandleEditorStateChange();

    return (
        <Physics paused debug>
            <Select multiple onChange={selectWidgetFromMeshArr}>
                <SceneDefaultCamera />
                <Widgets widgetsIds={widgetsObjectsIds} />
                {isGridEnabled && <Grid infiniteGrid sectionThickness={0.5} />}
            </Select>
        </Physics>
    );
};

export default { Editor, EditorUI: EditorLayout };
