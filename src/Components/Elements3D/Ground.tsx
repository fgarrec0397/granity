import { usePlane } from "@react-three/cannon";
import { TransformControls, TransformControlsProps } from "@react-three/drei";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "../../context/EditorContextProvider";

const Ground: FC = () => {
  const [hovered, setHover] = useState(false);
  const transformRef = useRef<TransformControlsProps>();
  const { isEditor, setIsEditing, setCurrentElement, currentMode } =
    useContext(EditorContext);
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  useEffect(() => {
    if (transformRef.current) {
      const onObjectChangeHandler = (): void => {
        if (setCurrentElement) {
          setCurrentElement({
            id: transformRef.current?.uuid,
            name: transformRef.current?.plane.geometry.type,
            position: [
              transformRef.current?.plane.position.x,
              transformRef.current?.plane.position.y,
              transformRef.current?.plane.position.z,
            ],
            rotation: [
              transformRef.current?.plane.rotation.x,
              transformRef.current?.plane.rotation.y,
              transformRef.current?.plane.rotation.z,
            ],
            scale: [
              transformRef.current?.plane.scale.x,
              transformRef.current?.plane.scale.y,
              transformRef.current?.plane.scale.z,
            ],
          });
        }
      };

      const onDraggingChanged = ({ value }: any): void => {
        if (setIsEditing) setIsEditing(value);
      };

      transformRef.current.addEventListener(
        "objectChange",
        onObjectChangeHandler
      );
      transformRef.current.addEventListener(
        "dragging-changed",
        onDraggingChanged
      );
    }
  }, []);

  useEffect(() => {
    if (transformRef.current) {
      transformRef.current.showX = isEditor;
      transformRef.current.showY = isEditor;
      transformRef.current.showZ = isEditor;
    }
  }, [isEditor]);

  useEffect(() => {
    if (transformRef.current?.setMode) {
      transformRef.current.setMode(currentMode);
    }
  }, [currentMode]);

  const handleOnPointerOver = (): void => setHover(true);
  const handleOnPointerOut = (): void => setHover(false);

  return (
    <>
      {/* @ts-ignore */}
      <TransformControls ref={transformRef}>
        <mesh
          ref={ref}
          onPointerOver={handleOnPointerOver}
          onPointerOut={handleOnPointerOut}
        >
          <planeGeometry attach="geometry" args={[10, 10]} />
          <meshBasicMaterial
            attach="material"
            color={hovered && isEditor ? "#c9c9f5" : "white"}
          />
        </mesh>
      </TransformControls>
    </>
  );
};

export default Ground;
