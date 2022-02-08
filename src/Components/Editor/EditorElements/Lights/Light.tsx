// @ts-ignore
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import React, { FC, useRef } from "react";
import { GeometryProps } from "../types";
import useSetCurrentElement from "../../../../hooks/Editor/useCurrentElement";

interface LightsTypeHelpers {
  [key: string]: any;
}

const helpers: LightsTypeHelpers = {
  spotLight: THREE.SpotLightHelper,
  pointLight: THREE.PointLightHelper,
  directionalLight: THREE.DirectionalLightHelper,
};

const Light: FC<GeometryProps> = ({ type, ...lightProps }) => {
  const ref = useRef<THREE.Mesh>();
  const { currentElement, setCurrentElement } = useSetCurrentElement();
  const LightComponent: any = type;

  console.log(currentElement, "currentElement");

  useHelper(ref, helpers[type], 1, "teal");

  const handleOnClick = (event: any): void => {
    setCurrentElement(event.eventObject);
  };

  return (
    <mesh onClick={handleOnClick} {...lightProps}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <LightComponent ref={ref} />
    </mesh>
  );
};

export default Light;
