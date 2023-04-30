import { Fetcher } from "@granity/helpers";

import { App } from "../coreTypes";

export type AppServiceParameters<MethodParameters> = MethodParameters & {
    endpoint: string;
};

export type GetAppParameters = {
    endpoint: string;
};

export type GetAppResponse = {
    sceneJsonString: string;
};

export type SaveAppParameters = {
    app: App;
};

export class AppService {
    static async get({ endpoint }: AppServiceParameters<any>) {
        const response = await Fetcher.get<any, GetAppResponse>(endpoint);

        return response.data;
    }

    static async save({ endpoint, app }: AppServiceParameters<SaveAppParameters>) {
        const response = await Fetcher.post<App, App>(endpoint, app);

        return response.data;
    }
}
