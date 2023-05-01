import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useQuery } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import { AppService } from "../_data/appService";
import { App } from "../coreTypes";
import useCore from "./useCore";

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    const { endpoints } = useConfig();
    const { app, updateApp, updateStatus } = useCore();

    const { data, status } = useQuery({
        queryKey: ["app", endpoints.app.get],
        queryFn: () => AppService.get({ endpoint: endpoints.app.get }),
    });

    useEffect(() => {
        updateStatus(status);
    }, [status, updateStatus]);

    useEffect(() => {
        if (status === "error") {
            enqueueSnackbar("No connections", { variant: "error" });
        }

        if (status === "success") {
            try {
                const fetchedApp: App = {
                    ...data,
                    savedScenes: data.savedScenes
                        ? {
                              ...data.savedScenes,
                              scenes: data.savedScenes?.scenes
                                  ? JSON.parse(data.savedScenes?.scenes)
                                  : undefined,
                          }
                        : app?.savedScenes,
                    publishedScenes: data.publishedScenes
                        ? {
                              ...data.publishedScenes,
                              scenes: data.publishedScenes?.scenes
                                  ? JSON.parse(data.publishedScenes?.scenes)
                                  : undefined,
                          }
                        : app?.publishedScenes,
                };

                updateApp(fetchedApp);
            } catch (errorParsing) {
                if (typeof errorParsing === "string") {
                    enqueueSnackbar(errorParsing, { variant: "error" });
                } else {
                    // eslint-disable-next-line no-console
                    console.error(errorParsing);
                    updateStatus("error");
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
};
