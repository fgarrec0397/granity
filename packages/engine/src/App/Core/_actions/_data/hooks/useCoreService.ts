import { useMutation, useQueryClient } from "@granity/helpers";
import { useCallback } from "react";

import { App } from "../../coreTypes";
import useConfig from "../../hooks/useConfig";
import { AppService } from "../appService";
import { ProcessesService } from "../processesService";

export default () => {
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();

    const saveAppMutation = useMutation({
        mutationKey: ["app"],
        mutationFn: AppService.save,
        onSuccess: (data) => {
            queryClient.setQueryData(["app"], data);
        },
    });

    const postProcessMutation = useMutation({
        mutationKey: ["process"],
        mutationFn: ProcessesService.post,
        onSuccess: (data) => {
            queryClient.setQueryData(["process"], data);
        },
    });

    const generateJsxFromGlb = useCallback(
        async (fileToProcess: string) => {
            await postProcessMutation.mutateAsync({
                endpoint: endpoints.processes.generateJsxFromGlb,
                processName: "runGltfjsxCommand",
                fileToProcess,
            });
        },
        [endpoints.processes.generateJsxFromGlb, postProcessMutation]
    );

    const save = async (app: App) => {
        const data = await saveAppMutation.mutateAsync({
            endpoint: endpoints.scenes.save,
            app,
        });

        return data;
    };

    return {
        generateJsxFromGlb,
        save,
    };
};
