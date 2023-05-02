import { useMutation, useQueryClient } from "@granity/helpers";
import { useCallback } from "react";

import { App, FetchStatus } from "../../coreTypes";
import useConfig from "../../hooks/useConfig";
import { AppService } from "../appService";
import { ProcessesService } from "../processesService";
import useCoreDispatch from "./useCoreDispatch";
import useCoreSelector from "./useCoreSelector";

export default () => {
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();
    const { app, status } = useCoreSelector();
    const { dispatchSetApp, dispatchSetStatus } = useCoreDispatch();

    const setStatus = useCallback(
        (newStatus: FetchStatus) => {
            dispatchSetStatus(newStatus);
        },
        [dispatchSetStatus]
    );

    const saveAppMutation = useMutation({
        mutationKey: ["app"],
        mutationFn: AppService.save,
        onMutate: () => {
            setStatus("loading");
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["app"], data);
            setTimeout(() => {
                setStatus("success");
            }, 10000);
        },
        onError: () => {
            setStatus("error");
        },
    });

    const postProcessMutation = useMutation({
        mutationKey: ["process"],
        mutationFn: ProcessesService.post,
        onMutate: () => {
            setStatus("loading");
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["process"], data);
            setStatus("success");
        },
        onError: () => {
            setStatus("error");
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

    const save = async (newApp: App) => {
        const data = await saveAppMutation.mutateAsync({
            endpoint: endpoints.app.save,
            app: newApp,
        });

        return data;
    };

    const setApp = useCallback(
        (newApp: App) => {
            dispatchSetApp(newApp);
        },
        [dispatchSetApp]
    );

    return {
        generateJsxFromGlb,
        save,
        app,
        setApp,
        status,
        setStatus,
    };
};
