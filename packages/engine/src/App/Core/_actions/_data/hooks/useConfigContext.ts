import { useContext } from "react";

import { ConfigContext } from "../providers";

export default () => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error("ConfigContext must be used inside ConfigProvider");
    }

    return context;
};
