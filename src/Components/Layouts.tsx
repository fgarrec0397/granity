import React, { FC } from "react";
import Feed, { uiFeedElements } from "./Feed";
import SideMenu from "./SideMenu";
import Suggestions from "./Suggestions";

const sideElementScaleY = 2.5;
const firstUiFeedElementHeight = uiFeedElements[0].scale[1];
export const feedPostionY =
  sideElementScaleY / 2 - firstUiFeedElementHeight / 2;

const Layouts: FC = () => {
  return (
    <>
      <SideMenu scale={[0.75, sideElementScaleY, 0.5]} />
      <Feed position={[0, feedPostionY, 0]} />
      <Suggestions
        scale={[0.75, sideElementScaleY, 0.5]}
        position={[1.2, feedPostionY, 0]}
      />
    </>
  );
};

export default Layouts;
