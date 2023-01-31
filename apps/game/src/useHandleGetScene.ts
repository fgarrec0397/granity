import { useScenes } from "@granity/engine";
import { useQuery } from "@granity/helpers";
import { Toaster } from "@granity/ui";
import { useEffect } from "react";

const getScenes = async () => {
    const response = await fetch("api/scene");

    if (!response.ok) {
        throw new Error("No connection");
    }

    return response.json();
};

export default () => {
    const { initScenes } = useScenes();

    const { data, status } = useQuery({
        queryKey: ["scenes"],
        queryFn: () => getScenes(),
    });
    useEffect(() => {
        if (status === "error") {
            Toaster.toast.error("No connections");
        }
        if (status === "success") {
            try {
                const { sceneJsonString } = data;
                if (!sceneJsonString) {
                    Toaster.toast.warning("No scenes found");
                }
                const scenes = JSON.parse(sceneJsonString);

                initScenes(scenes);
            } catch (errorParsing) {
                Toaster.toast.error(errorParsing as string);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
};
