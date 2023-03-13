import SceneDefaultCamera from "@granity/engine/App/Scenes/components/SceneDefaultCamera";
import useWidgets from "@granity/engine/App/Widgets/_actions/hooks/useWidgets";
import Widgets from "@granity/engine/App/Widgets/Widgets";
import { Grid, Select } from "@react-three/drei";
import { FC } from "react";

import { useEditor } from "./_actions/hooks";
import useEditorKeyboardControls from "./_actions/hooks/useEditorKeyboardControls";
import useHandleEditorStateChange from "./_actions/hooks/useHandleEditorStateChange";
import EditorLayout from "./components/EditorLayout";

const Editor: FC = () => {
    const { widgetsObjectsIds, selectWidgetFromMeshArr } = useWidgets();
    const { isGridEnabled } = useEditor();

    useEditorKeyboardControls();
    useHandleEditorStateChange();

    return (
        <Select multiple onChange={selectWidgetFromMeshArr}>
            <SceneDefaultCamera />
            <Widgets widgetsIds={widgetsObjectsIds} />
            {isGridEnabled && <Grid infiniteGrid sectionThickness={0.5} />}
        </Select>
    );
};

export default { Editor, EditorUI: EditorLayout };
