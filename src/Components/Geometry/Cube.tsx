import { useBox } from "@react-three/cannon";
import React, { FC } from "react";
import EditableMesh from "../Editor/EditableMesh";
import EditorGeometryWrapper from "../Editor/EditorGeometryWrapper";

const Cube: FC = () => {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 20, 0],
  }));

  return (
    <>
      <EditorGeometryWrapper>
        <EditableMesh geometryRef={ref} name="cube1">
          <boxGeometry attach="geometry" args={[10, 10]} />
        </EditableMesh>
      </EditorGeometryWrapper>
    </>
  );
};

export default Cube;
