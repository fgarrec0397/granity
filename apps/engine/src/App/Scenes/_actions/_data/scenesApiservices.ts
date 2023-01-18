import get from "@app/Core/_actions/_data/services/get";
import { Toaster } from "@granity/ui";

import { SaveSceneServiceParameter, SceneApiResponseResult } from "../scenesTypes";

export const postScenes = async (scenes: SaveSceneServiceParameter) => {
    const rawResponse = await fetch("api/scene", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scenes),
    });

    try {
        return await rawResponse.json();
    } catch (error: any) {
        return Toaster.toast.error(error);
    }
};

type FetchSuccessCallBack = (data?: SceneApiResponseResult) => void;
type FetchErrorCallBack = (error: unknown) => void;

// successCallBack: FetchSuccessCallBack,
// errorCallback: FetchErrorCallBack
export const getScenes = async () => {
    const response = await get("api/scene");

    if (!response.ok) {
        throw new Error("No connection");
    }

    return response.json();

    // try {
    //     const { sceneJsonString } = await response.json();
    //     if (!sceneJsonString) {
    //         return successCallBack(undefined);
    //     }
    //     const data = JSON.parse(sceneJsonString) as SceneApiResponseResult;

    //     successCallBack(data);
    // } catch (error: any) {
    //     // errorCallback(error);
    //     return Promise.reject(new Error(error));
    // }
};
