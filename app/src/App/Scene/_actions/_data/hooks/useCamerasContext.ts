import { useContext } from "react";
import SceneProviders from "../providers";

export default () => {
    return useContext(SceneProviders.CamerasContext);
};
