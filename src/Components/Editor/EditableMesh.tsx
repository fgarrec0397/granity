// @ts-ignore
import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";
import React, { FC, useContext, RefObject, useState } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import mapMeshToCurrentElement from "../../utils/mapMeshToCurrentElement";

interface Props extends MeshProps {
  geometryRef?: RefObject<THREE.Object3D>;
}

const EditableMesh: FC<Props> = ({ geometryRef, children, ...meshProps }) => {
  const [hovered, setHover] = useState(false);
  const { isEditor, setCurrentElement, currentElement } =
    useContext(EditorContext);

  const handleOnPointerOver = (): void => setHover(true);
  const handleOnPointerOut = (): void => setHover(false);
  const handleOnClick = (event: any): void => {
    if (setCurrentElement) {
      setCurrentElement(mapMeshToCurrentElement(event.eventObject));
    }
  };

  return (
    <mesh
      ref={geometryRef}
      onClick={handleOnClick}
      onPointerOver={handleOnPointerOver}
      onPointerOut={handleOnPointerOut}
      {...meshProps}
    >
      {children}
      <meshBasicMaterial
        attach="material"
        color={
          (hovered || currentElement?.name === meshProps.name) && isEditor
            ? "#c9c9f5"
            : "white"
        }
      />
    </mesh>
  );
};

export default EditableMesh;
