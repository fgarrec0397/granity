import { useQuery } from "@granity/helpers";
import { Toaster } from "@granity/ui";
import { useEffect } from "react";

import { getScenes } from "../_data/scenesApiservices";
import useInitScenes from "./useInitScenes";

export default () => {
    const { initScenes } = useInitScenes();

    const { data, status } = useQuery({
        queryKey: ["scenes"],
        queryFn: () => getScenes(),
    });

    useEffect(() => {
        if (status === "error") {
            Toaster.toast.error("No connections");
        }

        if (status === "success") {
            try {
                const { sceneJsonString } = data;

                if (!sceneJsonString) {
                    Toaster.toast.warning("No scenes found");
                }

                const scenes = JSON.parse(sceneJsonString);

                initScenes(scenes);
            } catch (errorParsing) {
                Toaster.toast.error(errorParsing as string);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
};
