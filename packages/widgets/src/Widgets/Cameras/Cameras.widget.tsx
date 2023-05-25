import {
    createGameWidget,
    FieldType,
    GameEditableWidget,
    helpersTypes,
    useCreateCamera,
    useGameUpdate,
} from "@granity/engine";
import { PerspectiveCamera } from "@granity/three";
import { FC, Ref, useEffect } from "react";

export type CamerasProps = GameEditableWidget & {
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

export const widget = createGameWidget<CamerasProps, PerspectiveCamera>({
    component: Cameras,
    hasRef: true,
    reducer: null,
    editorOptions: {
        helper: helpersTypes.CameraHelper,
        gizmo: true,
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
