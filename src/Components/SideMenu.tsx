import { Vector3 } from "@react-three/fiber";
import React, { FC } from "react";
import Box from "./Box";

interface Props {
  scale: Vector3;
}

const SideMenu: FC<Props> = ({ scale }) => {
  return (
    <Box position={[-1.1, 0, 0]} scale={scale} text="1 Hello motha fuck***" />
  );
};

export default SideMenu;
