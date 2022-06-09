import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { FC, useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import useIsEditor from "../../Editor/state/hooks/useIsEditor";
import useCameras from "../hooks/useCameras";
import TransformControls from "./TransformControls";

const EditorCamera: FC = () => {
    const { addCamera } = useCameras();
    const [hasEditorOpened, setHasEditorOpened] = useState(false);
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();
    const { camera } = useThree((state) => ({
        camera: state.camera,
        scene: state.scene,
    }));
    const cameraRef = useRef(camera);

    useEffect(() => {
        addCamera({ cameraRef });
    }, [addCamera]);

    useFrame(() => {
        if (isEditor && !hasEditorOpened) {
            setHasEditorOpened(true);
            camera.translateOnAxis(new Vector3(10, 10, 10), 1);
            camera.lookAt(10, 10, 10);
        }
    });

    return (
        <>
            <PerspectiveCamera />
            {isEditor && (
                <>
                    <TransformControls />
                    <OrbitControls
                        enablePan={!isEditing}
                        enableZoom={!isEditing}
                        enableRotate={!isEditing}
                    />
                </>
            )}
        </>
    );
};

export default EditorCamera;
