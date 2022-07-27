import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { usePlane } from "@react-three/cannon";
import { WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC, useRef } from "react";
import { Mesh } from "three";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
    }));

    return (
        <mesh ref={ref}>
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
