import { useSnackbar } from "@granity/ui";
import { useEffect } from "react";

import useEditor from "./useEditor";

export default () => {
    const { isEditor, isGamePreview, isPreview, isUIPreview } = useEditor();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            enqueueSnackbar("Editor Mode", { variant: "info" });
        }

        if (isGamePreview) {
            enqueueSnackbar("Game Preview Mode", { variant: "info" });
        }

        if (isPreview) {
            enqueueSnackbar("Preview Mode", { variant: "info" });
        }

        if (isUIPreview) {
            enqueueSnackbar("UI Preview Mode", { variant: "info" });
        }
    }, [enqueueSnackbar, isEditor, isGamePreview, isPreview, isUIPreview]);
};
