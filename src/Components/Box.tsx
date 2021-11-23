import { Html } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";
import React, { CSSProperties, FC, forwardRef } from "react";
// @ts-ignore
import * as THREE from "three";

export interface BoxProps extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
  heightPx?: number;
  widthPx?: number;
  padding?: string;
  color?: string;
  styles?: CSSProperties;
}

const Box: FC<BoxProps> = forwardRef(
  (
    {
      color = "white",
      scale,
      position,
      heightPx = 0,
      widthPx = 0,
      padding,
      styles,
      children,
    },
    ref
  ) => {
    const cube = new THREE.BoxBufferGeometry(1, 1, 1);

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
    // return (
    // <mesh ref={ref} scale={scale} position={position}>
    //   {/* <boxGeometry /> */}
    //   <edgesGeometry />
    //   <meshStandardMaterial color={color} roughness={0.75} metalness={0.75} />
    //   {/* <lineSegments geometry={edges} renderOrder={100}>
    //     <lineBasicMaterial color="black" />
    //   </lineSegments> */}
    //   <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
    //     <div
    //       style={{
    //         height: `${heightPx + 2}px` || "auto",
    //         width: `${widthPx + 2}px` || "auto",
    //         padding,
    //         backgroundColor: "white",
    //         border: "1px solid #f3f3f3",
    //         ...styles,
    //       }}
    //     >
    //       {children}
    //     </div>
    //   </Html>
    // </mesh>
    // );
  }
);

export default Box;
