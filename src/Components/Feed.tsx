import { MeshProps, useFrame, Vector3 } from "@react-three/fiber";
import React, { FC, createRef, useEffect } from "react";
import Box from "./Box";

interface Props {
  position: Vector3;
}

interface UIFeedElement {
  id?: string;
  scale: Vector3;
}

export const uiFeedElements: UIFeedElement[] = [
  {
    id: "feed",
    scale: [1, 1, 0.5],
  },
  {
    id: "element01",
    scale: [1, 0.4, 0.5],
  },
  {
    id: "element02",
    scale: [1, 0.2, 0.5],
  },
  {
    id: "element03",
    scale: [1, 0.6, 0.5],
  },
  {
    id: "element03",
    scale: [1, 0.2, 0.5],
  },
];

const Feed: FC<Props> = ({ position }) => {
  const ref = createRef<MeshProps>();
  const padding = 0.025;
  const elementsHeight: number[] = [];
  const [, groupPosY] = position;

  useEffect(() => {
    window.addEventListener("wheel", handleScrollWheel);
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
      {uiFeedElements.map((element, index) => {
        const [, sizeY] = element.scale;
        const totalElementsHeight = elementsHeight.reduce(
          (acc, curr) => acc + curr + padding,
          0
        );
        const posY =
          totalElementsHeight + sizeY / 2 - uiFeedElements[0].scale[1] / 2;
        elementsHeight.push(sizeY);

        return (
          <Box
            key={element.id}
            position={[0, index === 0 ? 0 : -posY, 0]}
            scale={[1, sizeY, 0.5]}
            text="2 Hello motha fuck***"
          />
        );
      })}
    </group>
  );
};

export default Feed;
