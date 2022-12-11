import SceneDefaultCamera from "@app/Scenes/components/SceneDefaultCamera";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import Widgets from "@app/Widgets/Widgets";
import { Select } from "@react-three/drei";
import { FC } from "react";

import useEditorKeyboardControls from "./_actions/hooks/useEditorKeyboardControls";
import useHandleEditorStateChange from "./_actions/hooks/useHandleEditorStateChange";
import EditorLayout from "./components/EditorLayout";

const Editor: FC = () => {
    const { widgetsObjects, selectWidgetFromMeshArr } = useWidgets();

    useEditorKeyboardControls();
    useHandleEditorStateChange();

    return (
        <Select multiple onChange={selectWidgetFromMeshArr}>
            <SceneDefaultCamera />
            <Widgets widgets={widgetsObjects} />
        </Select>
    );
};

export default { Editor, EditorUI: EditorLayout };
