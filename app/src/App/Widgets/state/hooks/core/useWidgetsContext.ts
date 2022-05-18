import { useContext } from "react";
import { WidgetsContext } from "../../../providers/WidgetsProvider";

export default () => {
    return useContext(WidgetsContext);
};
