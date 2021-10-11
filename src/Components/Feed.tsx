import { MeshProps, useFrame, Vector3 } from "@react-three/fiber";
import React, { FC, createRef, useEffect, CSSProperties } from "react";
import Box from "./Box";
import CreateNewTweet from "./CreateNewTweet";
import FeedHeader from "./FeedHeader";

interface Props {
  position: Vector3;
}

interface UIFeedElement {
  id?: string;
  scale: Vector3;
  heightPx?: number;
  widthPx?: number;
  padding?: string;
  styles?: CSSProperties;
  component: JSX.Element;
}

const feedWidthPx = 360;

export const uiFeedElements: UIFeedElement[] = [
  {
    id: "feed",
    scale: [1, 0.15, 0.5],
    heightPx: 51,
    widthPx: feedWidthPx,
    padding: "0 1em",
    styles: {
      display: "flex",
      alignItems: "center",
    },
    component: <FeedHeader />,
  },
  {
    id: "feed",
    scale: [1, 0.3, 0.5],
    heightPx: 106,
    widthPx: feedWidthPx,
    padding: "0.5em 1em",
    component: <CreateNewTweet />,
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
    if (ref.current && ref.current?.position?.y < groupPosY) {
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
            heightPx={element.heightPx}
            widthPx={element.widthPx}
            padding={element.padding}
            styles={element.styles}
            text="2 Hello motha fuck***"
          >
            {element.component}
          </Box>
        );
      })}
    </group>
  );
};

export default Feed;
