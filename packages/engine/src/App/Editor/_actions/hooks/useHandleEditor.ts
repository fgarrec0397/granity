import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import useEditor from "./useEditor";

export default () => {
    const { isEditor } = useEditor();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            enqueueSnackbar("Edit mode", { variant: "info" });
        } else {
            enqueueSnackbar("Game mode", { variant: "info" });
        }
    }, [enqueueSnackbar, isEditor]);
};
