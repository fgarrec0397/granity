// @ts-ignore
import * as THREE from "three";
import { MeshProps, ThreeEvent, useThree } from "@react-three/fiber";
import React, { FC, RefObject, useEffect, useState } from "react";
import mapMeshToCurrentElement from "../../../common/utils/mapMeshToCurrentElement";
import useEditorContext from "../state/hooks/useEditorContext";

interface Props extends MeshProps {
  geometryRef?: RefObject<THREE.Object3D>;
  component: string;
}

const hoveredColor = "#bdbdf5";
const selectedColor = "#9797ee";

const EditableMesh: FC<Props> = ({
  geometryRef,
  component,
  children,
  ...meshProps
}) => {
  const [hovered, setHover] = useState(false);
  const { isEditor, setCurrentElement, currentElement } = useEditorContext();
  const { mouse, camera, raycaster, scene } = useThree();

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onMouseUp = (event: MouseEvent): void => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const [closestMesh] = intersects.sort((x: any) => x.distance);
      if (setCurrentElement)
        setCurrentElement(
          mapMeshToCurrentElement(closestMesh.object, component)
        );
    }
  };

  const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
    event.stopPropagation();
    setHover(true);
  };
  const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
    event.stopPropagation();
    setHover(false);
  };

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
            ? hoveredColor
            : "white"
        }
      />
    </mesh>
  );
};

export default EditableMesh;
