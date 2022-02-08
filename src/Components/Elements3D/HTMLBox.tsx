// @ts-ignore
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";
import React, { CSSProperties, FC, forwardRef } from "react";

export interface HTMLBoxProps extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
  heightPx?: number;
  widthPx?: number;
  padding?: string;
  color?: string;
  styles?: CSSProperties;
  transparent?: boolean;
}

const HTMLBox: FC<HTMLBoxProps> = forwardRef(
  (
    {
      color = "white",
      scale,
      position,
      heightPx = 0,
      widthPx = 0,
      padding,
      styles,
      transparent,
      children,
    },
    ref
  ) => {
    const cube = new THREE.BoxBufferGeometry(1, 1, 1);

    if (transparent) {
      return (
        <mesh scale={scale} position={position}>
          <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
            <div
              style={{
                position: "relative",
                height: `${heightPx}px` || "auto",
                width: `${widthPx}px` || "auto",
                padding,
                ...styles,
              }}
            >
              {children}
            </div>
          </Html>
        </mesh>
      );
    }

    return (
      <>
        <mesh scale={scale} position={position}>
          <lineSegments>
            <edgesGeometry args={[cube]} />
            <meshBasicMaterial color="#a5a4a4" />
          </lineSegments>
          <meshStandardMaterial
            color={color}
            roughness={0.75}
            metalness={0.75}
          />
        </mesh>
        <mesh ref={ref} scale={scale} position={position}>
          <boxGeometry />
          <meshStandardMaterial
            color={color}
            roughness={0.75}
            metalness={0.75}
          />
          <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
            <div
              style={{
                position: "relative",
                height: `${heightPx}px` || "auto",
                width: `${widthPx}px` || "auto",
                padding,
                backgroundColor: "white",
                ...styles,
              }}
            >
              {children}
            </div>
          </Html>
        </mesh>
      </>
    );
  }
);

export default HTMLBox;
