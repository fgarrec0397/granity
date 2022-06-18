import { useContext } from "react";
import { CamerasContext } from "@scene/providers/CamerasContextProvider";

export default () => {
    return useContext(CamerasContext);
};
