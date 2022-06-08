import { useContext } from "react";
import { CamerasContext } from "../../providers/CamerasContextProvider";

export default () => {
    return useContext(CamerasContext);
};
