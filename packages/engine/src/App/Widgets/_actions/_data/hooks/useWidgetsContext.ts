import { useContext } from "react";

import { WidgetsContext } from "../providers/WidgetsProvider";

export default () => {
    const context = useContext(WidgetsContext);

    if (!context) {
        throw new Error("widgetsContext must be inside WidgetsProvider");
    }

    return context;
};
