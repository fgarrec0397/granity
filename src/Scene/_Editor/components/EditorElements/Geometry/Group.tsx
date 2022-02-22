// @ts-ignore
import * as THREE from "three";
import React, { FC, useRef } from "react";
import { GeometryBoxProps } from "../types";
import EditableMesh from "../../EditableMesh";

const Group: FC<GeometryBoxProps> = ({ sceneElement }) => {
    const ref = useRef<THREE.Mesh>();

    return <EditableMesh geometryRef={ref} sceneElement={sceneElement} />;
};

export default Group;
