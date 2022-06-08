import { OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { FC, useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";
import useIsEditor from "../../Editor/state/hooks/useIsEditor";
// import useCamerasContext from "../hooks/core/useCamerasContext";

const EditorCamera: FC = () => {
    // const { cameras, setCameras } = useCamerasContext();
    const [hasEditorOpened, setHasEditorOpened] = useState(false);
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();
    const { camera } = useThree((state) => ({
        camera: state.camera,
        scene: state.scene,
    }));
    // const cameraRef = useRef(camera);

    // useEffect(() => {
    //     setCameras([...cameras, { ref: cameraRef }]);
    // }, [cameras, setCameras]);

    useFrame(() => {
        if (isEditor && !hasEditorOpened) {
            setHasEditorOpened(true);
            camera.translateOnAxis(new Vector3(10, 10, 10), 1);
            camera.lookAt(10, 10, 10);
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault={isEditor} />
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
