import { useContext } from "react";
import { WidgetsModulesContext } from "@widgets/providers/WidgetsModulesProvider";

export default () => {
    return useContext(WidgetsModulesContext);
};
