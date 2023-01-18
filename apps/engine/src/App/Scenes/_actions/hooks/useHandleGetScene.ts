import { useQuery } from "@granity/helpers";
import { Toaster } from "@granity/ui";
import { useCallback, useEffect } from "react";

import { getScenes } from "../_data/scenesApiservices";
import useInitScenes from "./useInitScenes";

export default () => {
    const { initScenes } = useInitScenes();

    const { data, status, isLoading, isError, error } = useQuery({
        queryKey: ["scenes"],
        queryFn: () => getScenes(),
    });

    if (isError) {
        Toaster.toast.error(error as string);
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
            console.log({ errorParsing });
        }
    }
};
