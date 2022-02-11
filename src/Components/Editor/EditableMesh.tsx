// @ts-ignore
import * as THREE from "three";
import { MeshProps, useThree } from "@react-three/fiber";
import React, { FC, RefObject, useEffect, useState } from "react";
import mapMeshToCurrentElement from "../../utils/mapMeshToCurrentElement";
import useEditorContext from "../../hooks/Editor/useEditorContext";

interface Props extends MeshProps {
  geometryRef?: RefObject<THREE.Object3D>;
}

const EditableMesh: FC<Props> = ({ geometryRef, children, ...meshProps }) => {
  const [hovered, setHover] = useState(false);
  const { isEditor, setCurrentElement, currentElement } = useEditorContext();
  const { mouse, camera, raycaster, scene } = useThree();

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onPointerMove = (event: MouseEvent): void => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // TODO ---> mouse hover effect
  };

  const onMouseUp = (event: MouseEvent): void => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const [closestMesh] = intersects.sort((x: any) => x.distance);
      if (setCurrentElement)
        setCurrentElement(mapMeshToCurrentElement(closestMesh.object));
    }
    // continue here ---> Verify why 2 objects move when they superpose
  };

  const handleOnPointerOver = (): void => setHover(true);
  const handleOnPointerOut = (): void => setHover(false);

  return (
    <mesh
      ref={geometryRef}
      onPointerOver={handleOnPointerOver}
      onPointerOut={handleOnPointerOut}
      {...meshProps}
    >
      {children}
      <meshStandardMaterial
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
