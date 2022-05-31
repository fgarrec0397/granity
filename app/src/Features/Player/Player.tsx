import { useBox } from "@react-three/cannon";
import { FC } from "react";
import { EditableWidget } from "../../App/Editor/types";
import { FieldType, WidgetModule } from "../../App/Widgets/types";

export interface PlayerProps extends EditableWidget {
    shape: string;
}

type OwnProps = PlayerProps;

const Player: FC<OwnProps> = ({ hovered }) => {
    const [ref] = useBox(() => ({ mass: 1, type: "Dynamic" }));

    return (
        <mesh ref={ref} name="Player1" position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color={"red"} />
        </mesh>
    );
};

export const widget: WidgetModule<PlayerProps> = {
    component: Player,
    reducer: null,
    widgetDefinition: {
        name: "Player",
        options: [
            {
                name: "shape",
                displayName: "Shape",
                fieldType: FieldType.Select,
                selectOptions: [
                    {
                        value: "BoxGeometry",
                        name: "Cube",
                    },
                    {
                        value: "PlaneGeometry",
                        name: "Plane",
                    },
                ],
                defaultValue: "BoxGeometry",
            },
        ],
    },
};
