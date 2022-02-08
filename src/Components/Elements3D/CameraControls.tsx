// @ts-ignore
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import React, { FC, useState } from "react";
import TransformControls from "../RawThreeJs/TransformControls";
import PlayerCamera from "./PlayerCamera";
import useEditorContext from "../../hooks/Editor/useEditorContext";

const CameraControls: FC = () => {
  const [hasEditorOpened, setHasEditorOpened] = useState(false);
  const { isEditor, isEditing } = useEditorContext();
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
