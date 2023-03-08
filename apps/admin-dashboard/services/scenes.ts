import { ScenesDictionary } from "@granity/engine";

export const saveScenes = async (scenes: ScenesDictionary) => {
    const rawResponse = await fetch("/server/scene", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scenes),
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};
