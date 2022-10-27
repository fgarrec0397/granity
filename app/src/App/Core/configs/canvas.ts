import { Props as CanvasProps } from "@react-three/fiber";

const canvasConfig: Omit<CanvasProps, "children"> = {
    camera: { fov: 25, aspect: 1 },
};

export default canvasConfig;
