import { Html } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";
import React, { FC, forwardRef } from "react";

interface Props extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
}

const Box: FC<Props> = forwardRef(({ scale, position, children }, ref) => {
  return (
    <mesh ref={ref} scale={scale} position={position}>
      <boxGeometry />
      <meshStandardMaterial color="white" roughness={0.5} metalness={0.5} />
      <Html distanceFactor={1.5} position={[0, 0, 0.51]} transform sprite>
        {children}
      </Html>
    </mesh>
  );
});

export default Box;
