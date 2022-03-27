import { MeshProps, ThreeEvent } from "@react-three/fiber";
import React, { FC, useState } from "react";
import { IEditableProxy } from "../state/EditableProxyProvider";

interface Props extends MeshProps {
    editable: IEditableProxy;
}

const hoveredColor = "#bdbdf5";

const EditableProxy: FC<Props> = ({ editable }) => {
    const [hovered, setHover] = useState(false);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    return (
        <mesh onPointerOver={handleOnPointerOver} onPointerOut={handleOnPointerOut}>
            <boxGeometry />
            <meshStandardMaterial color={hovered ? hoveredColor : "white"} />
        </mesh>
    );
};

export default EditableProxy;
