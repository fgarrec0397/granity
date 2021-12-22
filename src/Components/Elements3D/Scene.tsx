import { Physics } from "@react-three/cannon";
import React, { FC, useContext, useEffect } from "react";
// import Ground from "./Ground";
import Lights from "./Lights";
import CameraControls from "./CameraControls";
// import Cube from "../Geometry/Cube";
import GeometryInstantiator, {
  GeometryElementDefinition,
} from "../Editor/GeometryInstantiator";
import { EditorContext } from "../../context/EditorContextProvider";

const data: GeometryElementDefinition[] = [
  {
    uid: "BUY6Drn9e1",
    component: "cube",
  },
];

const Scene: FC = () => {
  const { elementsOnScene } = useContext(EditorContext);

  useEffect(() => {
    console.log(elementsOnScene, "elementsOnScene");
  }, [elementsOnScene]);

  return (
    <>
      <Lights />
      <Physics>
        {elementsOnScene?.map((block) => GeometryInstantiator(block))}
        {/* <Cube />
        <Ground /> */}
        <CameraControls />
      </Physics>
    </>
  );
};

export default Scene;
