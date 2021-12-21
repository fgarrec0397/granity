// @ts-ignore
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useContext, useEffect, useState } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import mapCurrentElementToCurrentElementInformations from "../../utils/mapCurrentElementToCurrentElementInformations";

const TransformControlsComponent: FC = ({ children }) => {
  const {
    currentElement,
    setCurrentElementInformations,
    setIsEditing,
    currentMode,
  } = useContext(EditorContext);
  const { camera, gl, scene } = useThree();
  const [transformControl, setTransformControl] = useState<TransformControls>();

  useEffect(() => {
    if (!transformControl && currentElement) {
      const transformC = new TransformControls(camera, gl.domElement);

      transformC.attach(currentElement);
      transformC.setMode(currentMode);

      transformC.addEventListener("dragging-changed", ({ value }: any) => {
        if (setIsEditing) setIsEditing(value);
      });

      transformC.addEventListener("objectChange", () => {
        if (setCurrentElementInformations)
          setCurrentElementInformations(
            mapCurrentElementToCurrentElementInformations(currentElement)
          );
      });

      scene.add(transformC);
      setTransformControl(transformC);
    }
    return () => {
      if (transformControl) {
        scene.remove(transformControl);
        setTransformControl(undefined);
      }
    };
  }, [transformControl, camera, scene, gl, currentElement]);

  useEffect(() => {
    if (transformControl) {
      transformControl.setMode(currentMode);
    }
  }, [currentMode]);

  return <>{children}</>;
};

export default TransformControlsComponent;
