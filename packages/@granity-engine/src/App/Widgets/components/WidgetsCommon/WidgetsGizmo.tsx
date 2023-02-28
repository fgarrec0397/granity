import { Chip } from "@granity/ui";
import { Html } from "@react-three/drei";
import { FC } from "react";

type WidgetsGizmoProps = {
    text: string;
};

const WidgetsGizmo: FC<WidgetsGizmoProps> = ({ text }) => {
    return (
        <Html zIndexRange={[0]}>
            <Chip label={text} clickable color="primary" />
        </Html>
    );
};

export default WidgetsGizmo;
