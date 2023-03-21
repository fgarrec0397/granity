import { Html } from "@granity/three/drei";
import { Chip } from "@granity/ui";
import { FC } from "react";

type WidgetsGizmoProps = {
    text: string;
    onClick?: () => void;
};

const WidgetsGizmo: FC<WidgetsGizmoProps> = ({ text, onClick }) => {
    return (
        <Html material={<meshPhysicalMaterial opacity={0.1} />} zIndexRange={[0]}>
            <Chip label={text} clickable onClick={onClick} color="primary" />
        </Html>
    );
};

export default WidgetsGizmo;
