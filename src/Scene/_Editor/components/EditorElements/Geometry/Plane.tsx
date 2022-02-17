// @ts-ignore
import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import React, { FC, useRef } from "react";
import { GeometryPlaneProps } from "../types";
import EditableMesh from "../../EditableMesh";
import useIsEditor from "../../../state/hooks/useIsEditor";

const Plane: FC<GeometryPlaneProps> = ({ sceneElement }) => {
    const name = "plane1";
    const { isEditor } = useIsEditor();
    const ref = useRef<THREE.Mesh>();
    const [physicRef] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
    }));

    return (
        <EditableMesh
            geometryRef={isEditor ? ref : physicRef}
            rotation={[-Math.PI / 2, 0, 0]}
            name={name}
            sceneElement={sceneElement}
        >
            <planeGeometry attach="geometry" args={[10, 10]} />
        </EditableMesh>
    );
};

export default Plane;
