import { createGameWidget, FieldType, GameEditableWidget } from "@granity/engine";
import { FC } from "react";

export type TerrainProps = GameEditableWidget & {
    translateXOnPlay: boolean;
    color: string;
};

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = ({ color }) => {
    return (
        <mesh>
            <planeBufferGeometry />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

export const widget = createGameWidget({
    component: Terrain,
    reducer: null,
    name: "Terrain",
    options: [
        {
            name: "color",
            displayName: "Color",
            fieldType: FieldType.Text,
            defaultValue: "white",
        },
    ],
});
