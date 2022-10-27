import featuresCanvaProps from "@features/Core/configs/canvas";
import { Props as CanvasProps } from "@react-three/fiber";

/**
 * Props applied to the canvas
 */
const canvasProps: Omit<CanvasProps, "children"> = {
    camera: { fov: 25, aspect: 1 },
    ...featuresCanvaProps,
};

export default canvasProps;
