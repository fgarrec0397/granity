import { useMutation, useQueryClient } from "@granity/helpers";
import { useCallback } from "react";

import useConfig from "../../hooks/useConfig";
import { ProcessesService } from "../processesService";

export default () => {
    const queryClient = useQueryClient();
    const { endpoints } = useConfig();

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

    return {
        generateJsxFromGlb,
    };
};
