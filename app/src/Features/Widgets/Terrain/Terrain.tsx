import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { usePlane } from "@react-three/cannon";
import { WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC, useRef } from "react";
import { Mesh } from "three";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = () => {
    // const [ref] = usePlane(
    //     () => ({
    //         rotation: [-Math.PI / 2, 0, 0],
    //         position: [0, 0, 0],
    //     }),
    //     useRef<Mesh>(null)
    // );

    return (
        <mesh>
            <planeBufferGeometry args={[5, 5]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
};

export const widget: WidgetModule<TerrainProps> = {
    component: Terrain,
    reducer: null,
    widgetDefinition: {
        name: "Terrain",
    },
};
