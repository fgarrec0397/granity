import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import { usePlane } from "@react-three/cannon";
import { WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = ({ position, rotation, scale }) => {
    const { isEditor } = useIsEditor();

    // TODO convert three position to cannon position
    const [ref] = usePlane(() => ({
        position,
        rotation,
        scale,
    }));

    return (
        <mesh ref={!isEditor ? ref : null}>
            <planeBufferGeometry />
            <meshStandardMaterial color="white" />
        </mesh>
    );
};

export const widget: WidgetModule<TerrainProps> = {
    component: Terrain,
    reducer: null,
    widgetDefinition: {
        name: "Terrain",
        physic: {
            shape: "Plane",
            type: "Dynamic",
            mass: 0,
        },
    },
};
