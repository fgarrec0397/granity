import { Html } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";
import { Button, Slider } from "antd";
import React, { FC, forwardRef } from "react";

interface Props extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
}

const Box: FC<Props> = forwardRef(({ scale, position }, ref) => {
  return (
    <mesh ref={ref} scale={scale} position={position}>
      <boxGeometry />
      <meshStandardMaterial />
      <Html
        distanceFactor={1.5}
        position={[0, 0, 0.51]}
        transform
        occlude
        sprite
      >
        {/* <span>{text}</span> */}
        <Slider
          style={{ width: 100 }}
          min={0.5}
          max={1}
          step={0.01}
          value={undefined}
          onChange={undefined}
        />
        <Button type="primary">Primary Button</Button>
      </Html>
    </mesh>
  );
});

export default Box;
