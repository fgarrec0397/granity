import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import useCreateCamera from "@app/Scenes/_actions/hooks/useCreateCamera";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, HelpersTypes, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC, Ref, useEffect } from "react";
import { PerspectiveCamera } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
    isDefault: boolean;
};

const Cameras: FC<CamerasProps> = ({ translateXOnPlay, isDefault, position }, ref) => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera", position, ref!, isDefault);

    // set camera pos on component init
    useEffect(() => {
        if (translateXOnPlay) {
            camera.position.x = 0;
        }
    }, [camera.position, translateXOnPlay]);

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
    type: WidgetType.GameObject,
    editorOptions: {
        helper: HelpersTypes.CameraHelper,
        meshHolder: (
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <meshBasicMaterial visible={false} />
            </mesh>
        ),
    },
    name: "Cameras",
    options: [
        {
            name: "translateXOnPlay",
            displayName: "Translate X on play",
            fieldType: FieldType.Checkbox,
            defaultValue: false,
        },
        {
            name: "isDefault",
            displayName: "Set this camera as the default",
            fieldType: FieldType.Checkbox,
            defaultValue: false,
        },
    ],
});
