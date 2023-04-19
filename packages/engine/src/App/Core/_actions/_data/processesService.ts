import { Fetcher } from "@granity/helpers";

export type ProcessesServiceParameters<MethodParameters> = MethodParameters & {
    endpoint: string;
};

export type PostProcessParameters = {
    processName: string;
};

export class ProcessesService {
    static async post({
        endpoint,
        processName,
    }: ProcessesServiceParameters<PostProcessParameters>) {
        const response = await Fetcher.post<PostProcessParameters>(endpoint, {
            processName,
        });

        return response.data;
    }
}
