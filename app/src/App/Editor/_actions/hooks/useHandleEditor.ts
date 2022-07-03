import { notification } from "antd";
import { useEffect } from "react";

import useIsEditor from "./useIsEditor";

export default () => {
    const { isEditor } = useIsEditor();

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            notification.open({
                message: "Edit mode",
                description: "You entered in edit mode",
            });
        } else {
            notification.open({
                message: "Normal mode",
                description: "You entered in normal mode",
            });
        }
    }, [isEditor]);
};
