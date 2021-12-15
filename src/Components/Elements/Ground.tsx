import { usePlane } from "@react-three/cannon";
import React, { FC } from "react";

const Ground: FC = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial attach="material" color="white" />
    </mesh>
  );
};

export default Ground;
