// @ts-ignore
import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";
import React, { FC, useContext, RefObject, useState } from "react";
import { EditorContext } from "../../context/EditorContextProvider";

interface Props extends MeshProps {
  geometryRef?: RefObject<THREE.Object3D>;
}

const EditableMesh: FC<Props> = ({ geometryRef, children, ...meshProps }) => {
  const [hovered, setHover] = useState(false);
  const { isEditor, currentElement, setCurrentElement } =
    useContext(EditorContext);

  const handleOnPointerOver = (): void => setHover(true);
  const handleOnPointerOut = (): void => setHover(false);

  return (
    <mesh
      ref={geometryRef}
      onPointerOver={handleOnPointerOver}
      onPointerOut={handleOnPointerOut}
      onClick={(event: any) => {
        if (setCurrentElement) {
          setCurrentElement({
            name: meshProps.name,
            geometryRef,
          });
          console.log(meshProps.name, "onClick editable");
        }
      }}
      {...meshProps}
    >
      {children}
      <meshBasicMaterial
        attach="material"
        color={
          currentElement?.name === meshProps.name && isEditor
            ? "#c9c9f5"
            : "white"
        }
      />
    </mesh>
  );
};

export default EditableMesh;
