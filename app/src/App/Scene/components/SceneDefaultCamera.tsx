import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { FC, useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import useIsEditing from "@editor/hooks/useIsEditing";
import useIsEditor from "@editor/hooks/useIsEditor";
import useCameras from "@scene/hooks/useCameras";
import TransformControls from "./TransformControls";

const EditorCamera: FC = () => {
    const { addCamera, setCamera } = useCameras();
    const [hasEditorOpened, setHasEditorOpened] = useState(false);
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();
    const { camera } = useThree((state) => ({
        camera: state.camera,
    }));
    const cameraRef = useRef(camera);

    useEffect(() => {
        addCamera({ cameraRef });
    }, [addCamera]);

    useEffect(() => {
        if (cameraRef.current) {
            setCamera({ cameraRef });
        }
    }, [cameraRef, setCamera]);

    useFrame(() => {
        if (isEditor && !hasEditorOpened) {
            setHasEditorOpened(true);
            camera.translateOnAxis(new Vector3(10, 10, 10), 1);
            camera.lookAt(10, 10, 10);
        }
    });

    return (
        <>
            <perspectiveCamera ref={cameraRef} />
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
