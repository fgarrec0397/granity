import { TransformControlsProps } from "@react-three/drei";
import { useRef, useContext, useEffect } from "react";
import { EditorContext } from "../context/EditorContextProvider";

export default (): any => {
  const transformRef = useRef<TransformControlsProps>();
  const { isEditor, setIsEditing, setCurrentElement, currentMode } =
    useContext(EditorContext);

  useEffect(() => {
    if (transformRef.current) {
      const onObjectChangeHandler = (event: any): void => {
        // console.log(event, "event in wrapper");
        if (setCurrentElement) {
          console.log(transformRef.current, "current");
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

  return transformRef;
};
