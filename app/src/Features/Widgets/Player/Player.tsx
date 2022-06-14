import { FC } from "react";
import { BoxHelper } from "three";
import useIsEditor from "../../../App/Editor/state/hooks/useIsEditor";
import { EditableWidget } from "../../../App/Editor/types";
import { WidgetModule } from "../../../App/Widgets/types";
import PlayerCamera from "./components/PlayerCamera";

export type PlayerProps = EditableWidget;

type OwnProps = PlayerProps;

const Player: FC<OwnProps> = () => {
    const { isEditor } = useIsEditor();

    return <>{!isEditor && <PlayerCamera initialPlayerPos={[0, 0, 0]} />}</>;
};

export const widget: WidgetModule<PlayerProps> = {
    component: Player,
    reducer: null,
    editorOptions: {
        meshHolder: (
            <mesh name="GeometryForms1" position={[0, 0, 0]}>
                <sphereGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
        ),
    },
    widgetDefinition: {
        name: "Player",
    },
};
