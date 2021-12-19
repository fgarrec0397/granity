// @ts-ignore
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  PointerLockControls,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import React, { FC, useContext, useEffect, useState } from "react";
import PlayerCamera from "./PlayerCamera";
import { EditorContext } from "../../context/EditorContextProvider";
import useControlTransform from "../../hooks/useControlTransform";

const CameraControls: FC = () => {
  const [hasEditorOpened, setHasEditorOpened] = useState(false);
  const { isEditor, isEditing, currentElement } = useContext(EditorContext);
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);
  const transformRef = useControlTransform();

  useFrame(() => {
    if (isEditor && !hasEditorOpened) {
      setHasEditorOpened(true);
      camera.translateOnAxis(new THREE.Vector3(10, 10, 10), 1);
      camera.lookAt(10, 10, 10);
    }
  });

  useEffect(() => {
    if (currentElement) {
      console.log(currentElement.geometryRef, "currentElement.geometryRef");
    }
  }, [currentElement]);

  return (
    <>
      {isEditor ? (
        <>
          {currentElement?.geometryRef.current ? (
            /* @ts-ignore */
            <TransformControls
              ref={transformRef}
              /* @ts-ignore */
              object={currentElement.geometryRef.current}
              // mode={modes[snap.mode]}
            />
          ) : (
            /* @ts-ignore */
            <OrbitControls
            // enablePan={!isEditing}
            // enableZoom={!isEditing}
            // enableRotate={!isEditing}
            />
          )}
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
