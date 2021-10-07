import { Vector3 } from "@react-three/fiber";
import React, { FC } from "react";
import Box from "./Box";

interface Props {
  scale: Vector3;
}

const Suggestions: FC<Props> = ({ scale }) => {
  return (
    <Box position={[1, 0, 0]} scale={scale} text="3 Hello motha fuck***" />
  );
};

export default Suggestions;
