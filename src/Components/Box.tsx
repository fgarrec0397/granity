import { Html } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";
import React, { FC, forwardRef, HTMLProps, useState } from "react";

interface Props extends MeshProps {
  position: Vector3;
  scale: Vector3;
  text: string;
}

const Box: FC<Props> = forwardRef(({ scale, position }, ref) => {
  const [hovered, setHover] = useState(false);
  return (
    <mesh
      ref={ref}
      scale={scale}
      position={position}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      <Html distanceFactor={1.5} position={[0, 0, 0.51]} transform occlude>
        {/* <span>{text}</span> */}
        {/* <Slider
			style={{ width: 100 }}
			min={0.5}
			max={1}
			step={0.01}
			value={size}
			onChange={set}
		  /> */}
      </Html>
    </mesh>
  );
});

export default Box;
