import { toast } from "@app/Common/components/Html/Toast/ToastContainer";
import { useEffect } from "react";

import useEditor from "./useEditor";

export default () => {
    const { isEditor } = useEditor();

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            toast.info("Edit mode");
        } else {
            toast.info("Game mode");
        }
    }, [isEditor]);
};
