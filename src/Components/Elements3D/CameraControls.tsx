// @ts-ignore
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import React, { FC, useContext, useState } from "react";
import PlayerCamera from "./PlayerCamera";
import { EditorContext } from "../../context/EditorContextProvider";

const CameraControls: FC = () => {
  const [hasEditorOpened, setHasEditorOpened] = useState(false);
  const { isEditor, isEditing } = useContext(EditorContext);
  const camera = useThree((state) => state.camera);

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
