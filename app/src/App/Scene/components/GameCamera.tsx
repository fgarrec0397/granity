import { PerspectiveCamera, PointerLockControls, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";
import useIsEditor from "../../Editor/state/hooks/useIsEditor";
import useCameras from "../hooks/useCameras";

const GameCamera: FC = () => {
    const { addCamera } = useCameras();
    const { isEditor } = useIsEditor();
    const three = useThree((state) => ({
        set: state.set,
        camera: state.camera,
    }));
    const cameraRef = useRef(three.camera);

    useEffect(() => {
        addCamera({ cameraRef });
    }, [addCamera]);

    useHelper(cameraRef, CameraHelper);

    return (
        <>
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <PerspectiveCamera ref={cameraRef} />
                {!isEditor && <PointerLockControls />}
            </mesh>
        </>
    );
};

export default GameCamera;
