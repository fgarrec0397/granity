import { Html, useAspect } from "@react-three/drei";
import {
  Camera,
  MeshProps,
  useFrame,
  useThree,
  Vector3,
} from "@react-three/fiber";
// import * as THREE from "three";
import { Button, Slider } from "antd";
import React, { FC, forwardRef, HTMLProps, useState } from "react";

const THREE = require("three");

interface Props extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
}

const Box: FC<Props> = forwardRef(({ scale, position, children }, ref) => {
  // const { gl, camera } = useThree();
  // const size = gl.getSize(new THREE.Vector2(scale[0], scale[1]));
  // useFrame(() => {
  //   console.log(gl.getSize(new THREE.Vector2(1, 2.5)));
  // });
  // const visibleHeightAtZDepth = (
  //   depth: number,
  //   cameraParam: Camera
  // ): number => {
  //   let newDepth = depth;
  //   // compensate for cameras not positioned at z=0
  //   const cameraOffset = cameraParam.position.z;
  //   if (depth < cameraOffset) newDepth -= cameraOffset;
  //   else newDepth += cameraOffset;

  //   // vertical fov in radians
  //   const vFOV = (cameraParam.fov * Math.PI) / 180;

  //   // Math.abs to ensure the result is always positive
  //   return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  // };

  // const visibleWidthAtZDepth = (depth, camera) => {
  //   const height = visibleHeightAtZDepth(depth, camera);
  //   return height * camera.aspect;
  // };

  // console.log(visibleHeightAtZDepth(100, camera));

  const handlePositionCalculation = (
    element: any,
    camera: any,
    size: {
      width: number;
      height: number;
    }
  ): number[] => {
    console.log({ element });
    console.log({ camera });
    console.log({ size });
    return [0, 0, 0.51];
  };

  return (
    <mesh ref={ref} scale={scale} position={position}>
      <boxGeometry />
      <meshStandardMaterial />
      <Html distanceFactor={1.5} position={[0, 0, 0.51]} transform sprite>
        {children}
      </Html>
    </mesh>
  );
});

export default Box;
