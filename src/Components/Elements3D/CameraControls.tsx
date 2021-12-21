// @ts-ignore
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
// @ts-ignore
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import TransformControls from "../RawThreeJs/TransformControls";
import PlayerCamera from "./PlayerCamera";
import { EditorContext } from "../../context/EditorContextProvider";

const CameraControls: FC = () => {
  const [hasEditorOpened, setHasEditorOpened] = useState(false);
  const { isEditor, isEditing } = useContext(EditorContext);
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
