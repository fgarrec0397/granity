import { useEffect } from "react";
import { Toaster } from "ui-granity";

import { getScenes } from "../_data/scenesApiservices";
import useInitScenes from "./useInitScenes";

export default () => {
    const { initScenes } = useInitScenes();

    useEffect(() => {
        const handleFetchScene = async () => {
            await getScenes(
                (result) => {
                    initScenes(result);
                },
                (error: any) => {
                    Toaster.toast.error(error);
                }
            );
        };

        handleFetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
