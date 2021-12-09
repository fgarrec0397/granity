import { MeshProps, useFrame, Vector3 } from "@react-three/fiber";
import React, { FC, createRef, useEffect, CSSProperties } from "react";
import Box from "./Box";
import CreateNewTweet from "./CreateNewTweet";
import FeedHeader from "./FeedHeader";
import TweetPost from "./TweetPost";
import { scaleZ } from "../constants";

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

const feedWidthPx = 453;

export const uiFeedElements: UIFeedElement[] = [
  {
    id: "feeHeader",
    scale: [1, 0.15, scaleZ],
    heightPx: 53,
    widthPx: feedWidthPx,
    padding: "0 1em",
    styles: {
      display: "flex",
      alignItems: "center",
      bottom: "-1px",
    },
    component: <FeedHeader />,
  },
  {
    id: "createNewTweet",
    scale: [1, 0.3, scaleZ],
    heightPx: 108,
    widthPx: feedWidthPx,
    padding: "0.5em 1em",
    styles: {
      top: "1px",
    },
    component: <CreateNewTweet />,
  },
  {
    id: "feed",
    scale: [1, 0.35, scaleZ],
    heightPx: 126,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost avatar="https://picsum.photos/40?random=1" />,
  },
  {
    id: "feed",
    scale: [1, 0.9, scaleZ],
    heightPx: 325,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: (
      <TweetPost avatar="https://picsum.photos/40?random=2" hasImage />
    ),
  },
  {
    id: "feed",
    scale: [1, 0.35, scaleZ],
    heightPx: 126,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost avatar="https://picsum.photos/40?random=3" />,
  },
  {
    id: "feed",
    scale: [1, 0.9, scaleZ],
    heightPx: 325,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost hasImage />,
  },
  {
    id: "feed",
    scale: [1, 0.35, scaleZ],
    heightPx: 126,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost />,
  },
  {
    id: "feed",
    scale: [1, 0.9, scaleZ],
    heightPx: 325,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost hasImage />,
  },
  {
    id: "feed",
    scale: [1, 0.35, scaleZ],
    heightPx: 126,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost />,
  },
  {
    id: "feed",
    scale: [1, 0.9, scaleZ],
    heightPx: 325,
    widthPx: feedWidthPx,
    padding: "0.75em 1em",
    component: <TweetPost hasImage />,
  },
];

const Feed: FC<Props> = ({ position }) => {
  const ref = createRef<MeshProps>();
  const padding = 0.08; // originally 0.025
  const elementsHeight: number[] = [];
  const [, groupPosY] = position;
  // const [elRefs, setElRefs] = React.useState([]);

  // React.useEffect(() => {
  //   setElRefs((elements) =>
  //     Array(uiFeedElements.length)
  //       // @ts-ignore
  //       .fill()
  //       .map((_, i) => elements[i] || createRef())
  //   );
  //   console.log(elRefs, "elRefs");
  // }, [uiFeedElements.length]);

  // React.useEffect(() => {
  //   // elRefs.forEach((element: ) => {
  //   //   if (element.current && element.current?.position?.y < groupPosY) {
  //   //     element.current.position.y = groupPosY;
  //   //   }
  //   // });
  // }, [elRefs]);

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
          <>
            <Box
              key={element.id}
              position={[0, index === 0 ? 0 : -posY, 0]}
              scale={[1.25, sizeY, 0.25]}
              heightPx={element.heightPx}
              widthPx={element.widthPx}
              padding={element.padding}
              styles={element.styles}
              text="2 Hello motha fuck***"
            >
              {element.component}
            </Box>
          </>
        );
      })}
    </group>
  );
};

export default Feed;
