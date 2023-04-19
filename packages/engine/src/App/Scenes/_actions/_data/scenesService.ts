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
        const response = await post(endpoint, JSON.stringify(scenes));

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
        message: "An error occured. The scenes were not saved",
    };
};

export const post = async <
    ReturnValue,
    Parameters extends BodyInit,
    RequestHeaders extends HeadersInit
>(
    url: string,
    parameters: Parameters,
    headers?: RequestHeaders
) => {
    const requestHeaders = headers ?? {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
            ...requestHeaders,
        },
        body: parameters,
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        const result: ReturnValue = await rawResponse.json();

        return {
            success: true,
            result,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};
