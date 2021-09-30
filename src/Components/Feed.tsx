import { MeshProps, useFrame, Vector3 } from "@react-three/fiber";
import React, { FC, createRef, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import Box from "./Box";
import FeedHeader, { feedHeaderTotalHeight } from "./FeedHeader";

interface Props {
  position: Vector3;
}

const basicScaleElement = [1, 1, 0.5];

interface UIFeedElement {
  id?: string;
  scale: Vector3;
}

// If all the same height, it works. Otherwise the layout is broken
export const uiFeedElements: UIFeedElement[] = [
  {
    id: "feed",
    scale: [1, 0.5, 0.5],
  },
  {
    id: "element01",
    scale: [1, 0.6, 0.5],
  },
  {
    id: "element02",
    scale: [1, 0.7, 0.5],
  },
  {
    id: "element03",
    scale: [1, 1, 0.5],
  },
];

const Feed: FC<Props> = ({ position }) => {
  const ref = createRef<MeshProps>();
  const feedHeaderScale = [1, feedHeaderTotalHeight, 0.5];
  const elements = [1, 2, 3, 4];
  const padding = 0.1;
  const elementsHeight: number[] = [];
  const [, groupPosY] = position;

  useEffect(() => {
    // window.addEventListener("wheel", handleScrollWheel);
  }, []);

  useFrame(() => {
    if (ref.current && ref.current?.position.y < groupPosY) {
      ref.current.position.y = groupPosY;
    }
  });

  const handleScrollWheel = (event: WheelEvent): void => {
    const { deltaY } = event;
    if (ref.current) ref.current.position.y += deltaY / 750;
  };

  return (
    <group ref={ref} position={position}>
      {/* <FeedHeader position={0} scale={feedHeaderScale} /> */}
      {uiFeedElements.map((element, index) => {
        const totalElementsHeight = elementsHeight.reduce(
          (acc, curr) => acc + curr + padding,
          0
        );
        const [, sizeY] = element.scale;
        const posY = -totalElementsHeight;
        elementsHeight.push(sizeY);
        console.log(posY, "posY");
        console.log(elementsHeight, "elementsHeight");
        return (
          <Box
            key={element.id}
            position={[0, posY, 0]}
            scale={[1, sizeY, 0.5]}
            text="2 Hello motha fuck***"
          />
        );
      })}
      {/* {elements.map((element, index) => {
        const totalElementsHeight =
          elementsHeight.reduce((acc, curr) => acc + curr, 0) + padding * index;
        const sizeY = element * 0.5;
        const posY = -totalElementsHeight;
        elementsHeight.push(sizeY);
        return (
          <Box
            key={element}
            position={[0, posY, 0]}
            scale={[1, sizeY, 0.5]}
            text="2 Hello motha fuck***"
          />
        );
      })} */}
    </group>
  );
};

export default Feed;
