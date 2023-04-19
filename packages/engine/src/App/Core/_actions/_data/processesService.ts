import { Fetcher } from "@granity/helpers";

export type ProcessesServiceParameters<MethodParameters> = MethodParameters & {
    endpoint: string;
};

export type PostProcessParameters = {
    processName: string;
    fileToProcess: string;
};

export class ProcessesService {
    static async post({
        endpoint,
        processName,
        fileToProcess,
    }: ProcessesServiceParameters<PostProcessParameters>) {
        const response = await Fetcher.post<PostProcessParameters>(endpoint, {
            processName,
            fileToProcess,
        });

        return response.data;
    }
}
