import { useEffect } from "react";

import { getScene } from "../_data/scenesApiservices";
import { SceneApiResponseResult } from "../scenesTypes";
import useScenes from "./useScenes";

export default () => {
    const { initScenes } = useScenes();

    useEffect(() => {
        const handleFetchScene = async () => {
            await getScene(
                (result: SceneApiResponseResult) => {
                    initScenes(result);
                },
                (error: any) => {
                    console.warn(error);
                }
            );
        };

        handleFetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
