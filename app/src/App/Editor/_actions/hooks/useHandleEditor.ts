import { notification } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

import useEditor from "./useEditor";

export default () => {
    const { isEditor } = useEditor();

    // message: "Edit mode",
    // description: "You entered in edit mode",
    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            toast.success("Edit mode", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            notification.open({
                message: "Game mode",
                description: "You entered in game mode",
            });
        }
    }, [isEditor]);
};
