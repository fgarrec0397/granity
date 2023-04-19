import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

import useCoreService from "../_data/hooks/useCoreService";

export default () => {
    const { onEditorPointerMissed, isEditor } = useEditor();
    const { generateJsxFromGlb } = useCoreService();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            if (isEditor) {
                onEditorPointerMissed(event);
            }
        },
        [isEditor, onEditorPointerMissed]
    );

    return {
        onCorePointerMissed,
        generateJsxFromGlb,
    };
};
