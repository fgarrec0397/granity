import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { useHelper } from "@react-three/drei";
import useCameras from "@scene/_actions/hooks/useCameras";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";

export type CamerasProps = EditableWidget;

type OwnProps = CamerasProps;

const Cameras: FC<OwnProps> = () => {
    const { addCamera } = useCameras();
    const cameraRef = useRef(null!);

    useEffect(() => {
        addCamera({ cameraRef });
    }, [addCamera]);

    useHelper(cameraRef, CameraHelper);

    return <perspectiveCamera ref={cameraRef} />;
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    editorOptions: {
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
                name: "cameraType",
                displayName: "Type of Camera",
                fieldType: FieldType.Select,
                selectOptions: [
                    {
                        value: "perspective",
                        name: "Perspective",
                    },
                    {
                        value: "orthographic",
                        name: "Orthographic",
                    },
                ],
                defaultValue: "perspective",
            },
            {
                name: "test",
                displayName: "Test Multiple options",
                fieldType: FieldType.Select,
                selectOptions: [
                    {
                        value: "Test1",
                        name: "Test1",
                    },
                    {
                        value: "Test2",
                        name: "Test2",
                    },
                ],
                defaultValue: "perspective",
            },
            {
                name: "fieldOfView",
                displayName: "Field of View",
                fieldType: FieldType.Number,
                defaultValue: 50,
            },
        ],
    },
};
