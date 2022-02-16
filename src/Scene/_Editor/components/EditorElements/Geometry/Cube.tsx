// @ts-ignore
import * as THREE from "three";
import React, { FC, useRef } from "react";
import { GeometryBoxProps } from "../types";
import EditableMesh from "../../EditableMesh";

const Cube: FC<GeometryBoxProps> = ({
    id,
    name,
    component,
    position,
    rotation,
    scale,
}) => {
    const ref = useRef<THREE.Mesh>();
    // console.log(ref, "geometryRef");
    return (
        <EditableMesh
            geometryRef={ref}
            uuid={id}
            name={name}
            component={component}
        >
            <boxGeometry attach="geometry" args={[10, 10, 10]} />
        </EditableMesh>
    );
};

export default Cube;
