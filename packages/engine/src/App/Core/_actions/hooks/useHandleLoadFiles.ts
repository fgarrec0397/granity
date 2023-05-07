import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { useQuery } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import { FilesService } from "../_data/filesService";

// TODO - continue here. Put this hook in the Core folder
export default () => {
    const { enqueueSnackbar } = useSnackbar();
    const { endpoints } = useConfig();
    const { updateFilesStatus, updateFiles, pathToLoadFiles } = useCore();

    const { data, status, isLoading } = useQuery({
        queryKey: ["files", pathToLoadFiles],
        queryFn: () => FilesService.get({ endpoint: endpoints.files.get, path: pathToLoadFiles }),
    });

    useEffect(() => {
        if (status === "loading") {
            updateFilesStatus("loading");
        }
    }, [isLoading, updateFilesStatus, status]);

    useEffect(() => {
        if (status === "error") {
            enqueueSnackbar("No connections. Impossible to load files", { variant: "error" });
        }

        if (status === "success") {
            updateFiles(data);
        }
    }, [data, enqueueSnackbar, status, updateFiles]);
};
