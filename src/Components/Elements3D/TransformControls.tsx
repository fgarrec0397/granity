import {
  OrbitControlsProps,
  TransformControls,
  TransformControlsProps,
} from "@react-three/drei";
import React, { FC, ReactNode, useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../context/EditorContextProvider";

// @ts-ignore
const TransformControlsComponent: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const orbit = useRef<OrbitControlsProps>();
  const transformControlsRef = useRef<TransformControlsProps>();
  const { isEditor } = useContext(EditorContext);

  useEffect(() => {
    if (transformControlsRef.current) {
      const controls = transformControlsRef.current;
      if (controls.setMode) controls.setMode("scale");
    }
  });

  if (isEditor) {
    return (
      // @ts-ignore
      <TransformControls ref={transformControlsRef}>
        {/* @ts-ignore */}
        {children}
      </TransformControls>
    );
  }

  return children;
};

export default TransformControlsComponent;
