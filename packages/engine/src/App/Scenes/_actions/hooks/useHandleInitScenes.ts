import { useSnackbar } from "@engine/../../ui/src";
import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useQuery } from "@granity/helpers";
import { useEffect } from "react";

import { getScenes } from "../_data/scenesService";
import useScenes from "./useScenes";

export default () => {
    const { initScenes, setScenesLoading } = useScenes();
    const { enqueueSnackbar } = useSnackbar();
    const { endpoints } = useConfig();

    const { data, status, isLoading } = useQuery({
        queryKey: ["scenes", endpoints.scenes.get],
        queryFn: () => getScenes({ endpoint: endpoints.scenes.get }),
    });

    useEffect(() => {
        setScenesLoading(isLoading);
    }, [setScenesLoading, isLoading]);

    useEffect(() => {
        if (status === "error") {
            enqueueSnackbar("No connections", { variant: "error" });
        }

        if (status === "success") {
            try {
                const { sceneJsonString } = data;

                if (!sceneJsonString) {
                    enqueueSnackbar("No scenes found", { variant: "warning" });
                    return;
                }

                const scenes = JSON.parse(sceneJsonString);

                initScenes(scenes);
            } catch (errorParsing) {
                if (typeof errorParsing === "string") {
                    enqueueSnackbar(errorParsing, { variant: "error" });
                } else {
                    // eslint-disable-next-line no-console
                    console.error(errorParsing);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
};
