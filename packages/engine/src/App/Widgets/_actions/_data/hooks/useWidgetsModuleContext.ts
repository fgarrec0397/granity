import { useContext } from "react";

import { WidgetsModulesContext } from "../providers/WidgetsModulesProvider";

export default () => {
    const context = useContext(WidgetsModulesContext);

    if (!context) {
        throw new Error("You are trying to access WidgetsModulesContext outside a provider");
    }

    return context;
};
