import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import useCreateCamera from "@app/Scenes/_actions/hooks/useCreateCamera";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { HelpersTypes } from "@app/Widgets/_actions/widgetsConstants";
import { FieldType } from "@app/Widgets/_actions/widgetsConstants";
import { FC, Ref } from "react";
import { PerspectiveCamera } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras: FC<CamerasProps> = ({ translateXOnPlay }, ref) => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera", ref!);

    useGameUpdate(() => {
        if (translateXOnPlay) {
            camera.position.x += 0.01;
        }
    });

    return <perspectiveCamera ref={cameraRef as Ref<PerspectiveCamera>} />;
};

Cameras.displayName = "Cameras";

export const widget = createWidget<CamerasProps, PerspectiveCamera>({
    component: Cameras,
    hasRef: true,
    reducer: null,
    editorOptions: {
        helper: HelpersTypes.CameraHelper,
        meshHolder: (
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <meshBasicMaterial visible={false} />
            </mesh>
        ),
    },
    widgetDefinition: {
        name: "Cameras",
        options: [
            {
                name: "translateXOnPlay",
                displayName: "Translate X on play",
                fieldType: FieldType.Checkbox,
                defaultValue: false,
            },
        ],
    },
});
