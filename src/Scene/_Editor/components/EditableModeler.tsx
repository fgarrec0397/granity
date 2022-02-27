import { MeshProps, ThreeEvent } from "@react-three/fiber";
import React, { FC, useState } from "react";
import { IEditableProxy } from "../state/EditableProxyProvider";
import useIsEditor from "../state/hooks/useIsEditor";

interface Props extends MeshProps {
    editable: IEditableProxy;
}

const hoveredColor = "#bdbdf5";

const EditableProxy: FC<Props> = ({ editable }) => {
    const [hovered, setHover] = useState(false);
    const { isEditor } = useIsEditor();

    console.log(editable, "editable from EditableModeler");

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    return (
        <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="white" />
        </mesh>
    );
};

export default EditableProxy;
