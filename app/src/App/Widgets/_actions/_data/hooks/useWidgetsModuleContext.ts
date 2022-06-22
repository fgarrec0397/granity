import { useContext } from "react";
import { WidgetsModulesProvider } from "../providers";

export default () => {
    return useContext(WidgetsModulesProvider.WidgetsModulesContext);
};
