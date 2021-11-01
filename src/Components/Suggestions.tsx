import { Html, RoundedBox } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React, { FC } from "react";
import Box from "./Box";

interface Props {
  scale: Vector3;
  position: Vector3;
}

const Suggestions: FC<Props> = ({ scale, position }) => {
  return (
    <group position={position}>
      {/* @ts-ignore */}
      <RoundedBox
        position={[0.02, 0.05, 0]}
        scale={[0.2, 0.15, 0.15]}
        args={[4, 1, 2]}
        radius={0.4}
        smoothness={4}
      >
        {/* <meshPhongMaterial attach="material" color="#f3f3f3" wireframe /> */}
        <meshStandardMaterial color="white" roughness={0.5} metalness={0.5} />
        <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
          <div
            style={{
              height: "57px",
              width: "294px",
              backgroundColor: "rgb(247, 249, 249)",
              borderRadius: "48px",
              position: "relative",
              right: "-2px",
              top: "-1px",
              border: "1px solid #d0d0d0",
            }}
          />
        </Html>
      </RoundedBox>
      {/* @ts-ignore */}
      <RoundedBox
        position={[0, -(0.5 + 0.15), 0]}
        scale={[0.75, 1, 0.4]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial color="white" roughness={0.5} metalness={0.5} />
        <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
          <div
            style={{
              height: "360px",
              width: "269px",
              backgroundColor: "rgb(247, 249, 249)",
              borderRadius: "15px",
              position: "relative",
              right: "1px",
              top: "1px",
            }}
          />
        </Html>
      </RoundedBox>
      {/* @ts-ignore */}
      <RoundedBox
        position={[0, -(0.5 + 0.15 + 1 + 0.05), 0]}
        scale={[0.75, 1, 0.4]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial color="white" roughness={0.5} metalness={0.5} />
        <Html distanceFactor={1.1} position={[0, 0, 0.51]} transform sprite>
          <div
            style={{
              height: "359px",
              width: "267px",
              backgroundColor: "rgb(247, 249, 249)",
              borderRadius: "15px",
              position: "relative",
              top: "-1px",
            }}
          />
        </Html>
      </RoundedBox>
    </group>
  );
};

export default Suggestions;

// <Box position={[1, 0, 0]} scale={scale} text="3 Hello motha fuck***" />
