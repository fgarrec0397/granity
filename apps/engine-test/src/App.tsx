import { GranityEngine, useScenes } from "@granity/engine";
import { useQuery } from "@granity/helpers";
import { Toaster } from "@granity/ui";
import { FC, useEffect } from "react";

const getScenes = async () => {
    const response = await fetch("api/scene");

    if (!response.ok) {
        throw new Error("No connection");
    }

    return response.json();
};

const App: FC = () => {
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
                    console.log("No scenes found");
                }

                const scenes = JSON.parse(sceneJsonString);
                console.log(scenes, "scenes");

                initScenes(scenes);
            } catch (errorParsing) {
                console.log(errorParsing, "errorParsing");

                Toaster.toast.error(errorParsing as string);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return <GranityEngine />;
};

export default App;
