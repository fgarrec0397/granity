import { Fetcher } from "@granity/helpers";

import { ScenesDictionary } from "../scenesTypes";

export type ScenesServiceParameters<MethodParameters> = MethodParameters & {
    endpoint: string;
};

export type GetScenesParameters = {
    endpoint: string;
};

export type GetScenesResponse = {
    sceneJsonString: string;
};

export type PostScenesParameters = {
    scenes: ScenesDictionary;
};

export class ScenesService {
    static async get({ endpoint }: ScenesServiceParameters<any>) {
        const response = await Fetcher.get<any, GetScenesResponse>(endpoint);

        return response.data;
    }

    static async post({ endpoint, scenes }: ScenesServiceParameters<PostScenesParameters>) {
        const response = await Fetcher.post<ScenesDictionary, ScenesDictionary>(endpoint, scenes);

        return response.data;
    }
}
