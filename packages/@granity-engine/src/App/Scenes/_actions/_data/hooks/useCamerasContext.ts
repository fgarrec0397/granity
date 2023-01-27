import { useContext } from "react";

import { CamerasContext } from "../providers";

export default () => {
    const context = useContext(CamerasContext);

    if (!context) {
        throw new Error("CameraContext must be used inside CameraProvider");
    }

    return context;
};
