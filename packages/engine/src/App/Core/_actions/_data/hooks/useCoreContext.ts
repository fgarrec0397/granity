import { useContext } from "react";

import { CoreContext } from "../providers";

export default () => {
    const context = useContext(CoreContext);

    if (!context) {
        throw new Error("CoreContext must be used inside CoreProvider");
    }

    return context;
};
