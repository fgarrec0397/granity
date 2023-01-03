import { toast } from "@app/Common/components/Html/Toast/ToastContainer";
import { useEffect } from "react";

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
                    toast.error(error);
                }
            );
        };

        handleFetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
