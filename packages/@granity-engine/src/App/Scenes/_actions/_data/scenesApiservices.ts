import { get, post } from "@granity-engine/App/Core/_actions/_data/services/api";
import { Toaster } from "@granity/ui";

import { SaveSceneServiceParameter } from "../scenesTypes";

export const postScenes = async (scenes: SaveSceneServiceParameter) => {
    const rawResponse = await post("api/scene", scenes);

    try {
        return await rawResponse.json();
    } catch (error: any) {
        return Toaster.toast.error(error);
    }
};

export const getScenes = async () => {
    const response = await get("api/scene");

    if (!response.ok) {
        throw new Error("No connection");
    }

    return response.json();
};
