import { Html } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";
import React, { CSSProperties, FC, forwardRef } from "react";

export interface BoxProps extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
  heightPx?: number;
  widthPx?: number;
  padding?: string;
  styles?: CSSProperties;
}

const Box: FC<BoxProps> = forwardRef(
  ({ scale, position, heightPx, widthPx, padding, styles, children }, ref) => {
    return (
      <mesh ref={ref} scale={scale} position={position}>
        <boxGeometry />
        <meshStandardMaterial color="white" roughness={0.5} metalness={0.5} />
        <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
          <div
            style={{
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
    );
  }
);

export default Box;
