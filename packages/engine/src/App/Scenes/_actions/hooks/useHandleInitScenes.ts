import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { useEffect } from "react";

import useScenes from "./useScenes";

export default () => {
    const { initScenes } = useScenes();
    const { app, appStatus } = useCore();

    useEffect(() => {
        const scenes = app?.savedScenes?.scenes; // TODO -continue here. Make this configurable

        if (appStatus === "success") {
            initScenes(scenes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [app?.savedScenes?.scenes]);
};
