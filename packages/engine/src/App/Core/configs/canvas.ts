import { Props as CanvasProps } from "@react-three/fiber";

/**
 * Props applied to the canvas
 */
const canvasProps: Omit<CanvasProps, "children"> = {
    camera: { fov: 25, aspect: 1 },
};

export default canvasProps;
