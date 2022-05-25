import { useContext } from "react";
import { WidgetsModulesContext } from "../../../providers/WidgetsModulesProvider";

export default () => {
    return useContext(WidgetsModulesContext);
};
