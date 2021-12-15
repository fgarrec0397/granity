// @ts-ignore
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import React, { FC, useContext } from "react";
import Ground from "./Ground";
import Lights from "./Lights";
import Player from "./Player";
import { EditorContext } from "../../context/EditorContextProvider";

const Scene: FC = () => {
  const { isEditor } = useContext(EditorContext);
  const camera = useThree((state) => state.camera);

  let hasEditorOpened = false;

  useFrame(() => {
    if (isEditor && !hasEditorOpened) {
      hasEditorOpened = true;
      camera.translateOnAxis(new THREE.Vector3(10, 10, 10), 1);
      camera.lookAt(10, 10, 10);
    }
  });

  return (
    <>
      <Lights />
      <Physics gravity={[0, -30, 0]}>
        {isEditor ? (
          <>
            <Ground />
            {/* @ts-ignore */}
            <OrbitControls />
          </>
        ) : (
          <>
            <Player />
            <Ground />
            {/* @ts-ignore */}
            <PointerLockControls />
          </>
        )}
      </Physics>
    </>
  );
};

export default Scene;
