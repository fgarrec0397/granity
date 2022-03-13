import { MeshProps, ThreeEvent } from "@react-three/fiber";
import React, { FC, useState } from "react";
import { IEditableProxy } from "../../App/Editor/state/EditableProxyProvider";

interface Props extends MeshProps {
    editable: IEditableProxy;
}

const hoveredColor = "#bdbdf5";

const GeometryForms: FC<Props> = ({ editable }) => {
    const [hovered, setHover] = useState(false);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    const meshProps = () => {
        const editableProps = editable;
        delete editable.object;

        return editableProps;
    };

    return (
        <mesh
            {...meshProps()}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
        >
            <boxGeometry />
            <meshStandardMaterial color={hovered ? hoveredColor : "white"} />
        </mesh>
    );
};

export const widget = {
    component: GeometryForms,
};
