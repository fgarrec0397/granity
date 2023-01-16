import { useContext } from "react";

import SceneProviders from "../providers";

export default () => {
    const context = useContext(SceneProviders.CamerasContext);

    if (!context) {
        throw new Error("widgetsContext must be inside WidgetsProvider");
    }

    return context;
};
