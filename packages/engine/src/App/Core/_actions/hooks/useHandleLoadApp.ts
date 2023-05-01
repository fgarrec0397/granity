import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import useScenes from "@engine/App/Scenes/_actions/hooks/useScenes";
import { useQuery } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import { AppService } from "../_data/appService";

export default () => {
    const { initScenes, setScenesStatus } = useScenes();
    const { enqueueSnackbar } = useSnackbar();
    const { endpoints } = useConfig();

    const { data, status, isLoading } = useQuery({
        queryKey: ["app", endpoints.app.get],
        queryFn: () => AppService.get({ endpoint: endpoints.app.get }),
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
                console.log(data);

                // const { sceneJsonString } = data;
                // if (!sceneJsonString) {
                //     enqueueSnackbar("No scenes found", { variant: "warning" });
                //     return;
                // }
                // const scenes = JSON.parse(sceneJsonString);
                // initScenes(scenes);
                // setScenesStatus("isSuccess");
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
