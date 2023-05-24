import { useContext } from "react";

import { UIWidgetsContext } from "../providers/UIWidgetsProvider";

export default () => {
    const context = useContext(UIWidgetsContext);

    if (!context) {
        throw new Error("UIWidgetsContext must be inside UIWidgetsProvider");
    }

    return context;
};
