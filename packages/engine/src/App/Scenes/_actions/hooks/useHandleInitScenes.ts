import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { useEffect } from "react";

import useScenes from "./useScenes";

export default (scenesType: "savedScenes" | "publishedScenes" = "savedScenes") => {
    const { initScenes } = useScenes();
    const { app, appStatus } = useCore();

    useEffect(() => {
        const scenes = app?.[scenesType]?.scenes;

        if (appStatus === "success") {
            initScenes(scenes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [app?.[scenesType]?.scenes]);
};
