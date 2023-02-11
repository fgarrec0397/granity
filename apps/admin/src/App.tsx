import { GranityEngine, useScenes } from "@granity/engine";
import { useQuery } from "@granity/helpers";
import { useSnackbar } from "@granity/ui";
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
    const { enqueueSnackbar } = useSnackbar();

    const { data, status } = useQuery({
        queryKey: ["scenes"],
        queryFn: () => getScenes(),
    });

    useEffect(() => {
        if (status === "error") {
            enqueueSnackbar("No connections", { variant: "error" });
        }

        if (status === "success") {
            try {
                const { sceneJsonString } = data;

                if (!sceneJsonString) {
                    enqueueSnackbar("No scenes found", { variant: "error" });
                }

                const scenes = JSON.parse(sceneJsonString);

                initScenes(scenes);
            } catch (errorParsing) {
                enqueueSnackbar(errorParsing as string, { variant: "error" });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return <GranityEngine />;
};

export default App;
