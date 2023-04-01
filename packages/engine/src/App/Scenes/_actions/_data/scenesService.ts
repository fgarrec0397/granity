import { post } from "@engine/App/Core/_actions/_data/coreService";

import { ScenesDictionary } from "../scenesTypes";

export type GetScenesParameters = {
    endpoint: string;
};

export type SaveScenesParameters = {
    endpoint: string;
    scenes: ScenesDictionary;
};

export const getScenes = async ({ endpoint }: GetScenesParameters) => {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error("No connection");
    }

    return response.json();
};

export const saveScenes = async ({ endpoint, scenes }: SaveScenesParameters) => {
    if (scenes) {
        const response = await post(endpoint, scenes);

        if (!response.success) {
            return {
                status: false,
                message: response.errorMessage as string,
            };
        }

        if (response.success) {
            return {
                status: true,
                message: "Scenes saved with success!",
            };
        }
    }

    return {
        status: false,
        message: "An error occured",
    };
};
