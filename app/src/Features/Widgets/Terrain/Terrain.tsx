import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { RigidBody } from "@react-three/rapier";
import { WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = () => {
    return (
        <RigidBody>
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
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
