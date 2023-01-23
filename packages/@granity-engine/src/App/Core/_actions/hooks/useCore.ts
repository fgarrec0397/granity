import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

export default () => {
    const { onEditorPointerMissed, isEditor } = useEditor();

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
    };
};
