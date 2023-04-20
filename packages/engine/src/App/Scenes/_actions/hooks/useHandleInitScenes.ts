import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useQuery } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import { ScenesService } from "../_data/scenesService";
import useScenes from "./useScenes";

export default () => {
    const { initScenes, setScenesStatus } = useScenes();
    const { enqueueSnackbar } = useSnackbar();
    const { endpoints } = useConfig();

    const { data, status, isLoading } = useQuery({
        queryKey: ["scenes", endpoints.scenes.get],
        queryFn: () => ScenesService.get({ endpoint: endpoints.scenes.get }),
    });

    useEffect(() => {
        setScenesStatus("isLoading");
    }, [isLoading, setScenesStatus]);

    useEffect(() => {
        if (status === "error") {
            enqueueSnackbar("No connections", { variant: "error" });
            setScenesStatus("isError");
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
                setScenesStatus("isSuccess");
            } catch (errorParsing) {
                if (typeof errorParsing === "string") {
                    enqueueSnackbar(errorParsing, { variant: "error" });
                } else {
                    // eslint-disable-next-line no-console
                    console.error(errorParsing);
                    setScenesStatus("isError");
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
};
