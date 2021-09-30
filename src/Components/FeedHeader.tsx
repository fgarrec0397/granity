import { Vector3 } from "@react-three/fiber";
import React, { FC } from "react";
import Box from "./Box";

interface Props {
  position: Vector3;
  scale: Vector3;
}

const topElementHeight = 0.2;
const bottomElementHeight = 0.3;
const padding = 0.3;
export const feedHeaderTotalHeight =
  topElementHeight + bottomElementHeight + padding;

const FeedHeader: FC<Props> = ({ position, scale }) => {
  console.log(position, "position");
  return (
    <>
      <Box
        position={0}
        scale={[1, topElementHeight, 0.5]}
        text="2 Hello motha fuck***"
      />
      <Box
        position={[0, -padding, 0]}
        scale={[1, bottomElementHeight, 0.5]}
        text="2 Hello motha fuck***"
      />
    </>
  );
};

export default FeedHeader;
