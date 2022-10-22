import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import createWidget from "@app/Widgets/_actions/utilities/createWidgetObject";
import { useHelper } from "@react-three/drei";
import { FC, useRef } from "react";
import { BoxHelper } from "three";

import PlayerCamera from "./components/PlayerCamera";

export type PlayerProps = EditableWidget;

type OwnProps = PlayerProps;

const Player: FC<OwnProps> = () => {
    const ref = useRef(null);
    const { isEditor } = useEditor();

    useHelper(isEditor && ref, BoxHelper, "red");

    return (
        <mesh ref={ref} scale={[0.25, 0.25, 0.25]}>
            <boxGeometry />
            <meshBasicMaterial visible={false} />
            {!isEditor && <PlayerCamera initialPlayerPos={[0, 0, 0]} />}
        </mesh>
    );
};

export const widget = createWidget({
    component: Player,
    reducer: null,
    editorOptions: {
        meshHolder: (
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <meshBasicMaterial visible={false} />
            </mesh>
        ),
    },
    widgetDefinition: {
        name: "Player",
    },
});
