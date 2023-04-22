import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { useQuery } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import { FilesService } from "../_data/filesService";
import useEditor from "./useEditor";

export default () => {
    const { enqueueSnackbar } = useSnackbar();
    const { endpoints } = useConfig();
    const { updateFilesStatus, updateFiles, pathToLoadFiles } = useEditor();

    const { data, status, isLoading } = useQuery({
        queryKey: ["files", pathToLoadFiles],
        queryFn: () => FilesService.get({ endpoint: endpoints.files.get, path: pathToLoadFiles }),
    });

    useEffect(() => {
        if (status === "loading") {
            updateFilesStatus("isLoading");
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
