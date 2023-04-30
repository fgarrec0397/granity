import { App, useScenes } from "@engine/api";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

import useCoreService from "../_data/hooks/useCoreService";

export default () => {
    const { onEditorPointerMissed, isEditor, isPreview } = useEditor();
    const { saveScenes } = useScenes();
    const { generateJsxFromGlb, save } = useCoreService();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            if (isEditor || isPreview) {
                onEditorPointerMissed(event);
            }
        },
        [isEditor, isPreview, onEditorPointerMissed]
    );

    const saveApp = useCallback(() => {
        const savedScenes = saveScenes();

        // const newApp: App = {
        //     savedScenes,
        // }
    }, [saveScenes]);

    return {
        onCorePointerMissed,
        generateJsxFromGlb,
        saveApp,
    };
};
