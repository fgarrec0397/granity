// @ts-ignore
import * as THREE from "three";
import { MeshProps, useThree } from "@react-three/fiber";
import React, { FC, RefObject, useEffect, useState } from "react";
import mapMeshToCurrentElement from "../../utils/mapMeshToCurrentElement";
import useEditorContext from "../../hooks/Editor/useEditorContext";

interface Props extends MeshProps {
  geometryRef?: RefObject<THREE.Object3D>;
}

let previousHoveredObj: any;

const EditableMesh: FC<Props> = ({ geometryRef, children, ...meshProps }) => {
  const [hovered, setHover] = useState(false);
  const { isEditor, setCurrentElement, currentElement } = useEditorContext();
  const { mouse, camera, raycaster, scene } = useThree();

  useEffect(() => {
    // window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      // window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // // Not sure to keep this code and continue with the OOTB hover handler
  // const onPointerMove = (event: MouseEvent): void => {
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //   raycaster.setFromCamera(mouse, camera);

  //   const intersects = raycaster.intersectObjects(scene.children);

  //   if (intersects.length > 0) {
  //     const [closestMesh] = intersects.sort((x: any) => x.distance);
  //     previousHoveredObj = closestMesh;
  //     closestMesh.object.material.color.set(0x6b6be4);
  //     console.log(closestMesh);
  //     if (closestMesh.object.uuid === previousHoveredObj?.object.uuid) {
  //       previousHoveredObj?.object.material.color.set(0xffffff);
  //     }
  //   } else {
  //     previousHoveredObj?.object.material.color.set(0xffffff);
  //   }
  // };

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
            ? "#9797ee"
            : "white"
        }
      />
    </mesh>
  );
};

export default EditableMesh;
