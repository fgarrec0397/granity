import { PerspectiveCamera, PointerLockControls, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";
import useIsEditor from "../../Editor/state/hooks/useIsEditor";
import useCamerasContext from "../hooks/core/useCamerasContext";

const GameCamera: FC = () => {
    // const { isEditor } = useIsEditor();
    // const { cameras, setCameras } = useCamerasContext();
    // const three = useThree((state) => ({
    //     set: state.set,
    //     camera: state.camera,
    // }));
    // const cameraRef = useRef(three.camera);
    // useEffect(() => {
    //     setCameras([...cameras, { cameraRef }]);
    // }, [cameras, setCameras]);

    // useHelper(cameraRef, CameraHelper);

    return null;

    // return (
    //     <>
    //         <mesh scale={[0.25, 0.25, 0.25]}>
    //             <boxGeometry />
    //             <PerspectiveCamera ref={cameraRef} />
    //             {!isEditor && <PointerLockControls />}
    //         </mesh>
    //     </>
    // );
};

export default GameCamera;
