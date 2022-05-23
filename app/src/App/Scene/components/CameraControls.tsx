import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { FC, useState } from "react";
import TransformControls from "./TransformControls";
import PlayerCamera from "./PlayerCamera";
import useIsEditor from "../../Editor/state/hooks/useIsEditor";
import useIsEditing from "../../Editor/state/hooks/useIsEditing";

const CameraControls: FC = () => {
    const [hasEditorOpened, setHasEditorOpened] = useState(false);
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();
    const { camera } = useThree((state) => ({
        camera: state.camera,
        scene: state.scene,
    }));

    useFrame(() => {
        if (isEditor && !hasEditorOpened) {
            setHasEditorOpened(true);
            camera.translateOnAxis(new THREE.Vector3(10, 10, 10), 1);
            camera.lookAt(10, 10, 10);
        }
    });

    return (
        <>
            {isEditor ? (
                <>
                    <TransformControls />
                    {/* @ts-ignore */}
                    <OrbitControls
                        enablePan={!isEditing}
                        enableZoom={!isEditing}
                        enableRotate={!isEditing}
                    />
                </>
            ) : (
                <>
                    <PlayerCamera />
                    {/* @ts-ignore */}
                    <PointerLockControls />
                </>
            )}
        </>
    );
};

export default CameraControls;
