import { PointerLockControls, useHelper } from "@react-three/drei";
import { Camera } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";
import useIsEditor from "../../../App/Editor/state/hooks/useIsEditor";
import useCameras from "../../../App/Scene/hooks/useCameras";

const GameCamera: FC = () => {
    const { addCamera } = useCameras();
    const { isEditor } = useIsEditor();
    const cameraRef = useRef<Camera>(null!);

    useEffect(() => {
        addCamera({ cameraRef });
    }, [addCamera]);

    useHelper(cameraRef, CameraHelper);

    return (
        <>
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <perspectiveCamera ref={cameraRef} />
                {!isEditor && <PointerLockControls />}
            </mesh>
        </>
    );
};

export default GameCamera;
