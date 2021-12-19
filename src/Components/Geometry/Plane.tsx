import { usePlane } from "@react-three/cannon";
import React, { FC } from "react";
import EditableMesh from "../Editor/EditableMesh";
import EditorGeometryWrapper from "../Editor/EditorGeometryWrapper";

const Plane: FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <>
      <EditorGeometryWrapper>
        <EditableMesh geometryRef={ref} name="plane1">
          <planeGeometry attach="geometry" args={[10, 10]} />
        </EditableMesh>
      </EditorGeometryWrapper>
    </>
  );
};

export default Plane;
