import { notification } from "antd";
import { useEffect } from "react";

import useEditor from "./useEditor";

export default () => {
    const { isEditor } = useEditor();

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            notification.open({
                message: "Edit mode",
                description: "You entered in edit mode",
            });
        } else {
            notification.open({
                message: "Game mode",
                description: "You entered in game mode",
            });
        }
    }, [isEditor]);
};
