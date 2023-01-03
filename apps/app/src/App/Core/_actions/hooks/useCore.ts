import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useFeatures from "@features/Core/_actions/useFeatures";
import { useCallback } from "react";

export default () => {
    const { onEditorPointerMissed, isEditor } = useEditor();
    const { onFeaturesPointerMissed } = useFeatures();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            if (isEditor) {
                onEditorPointerMissed(event);
            } else {
                onFeaturesPointerMissed(event);
            }
        },
        [isEditor, onEditorPointerMissed, onFeaturesPointerMissed]
    );

    return {
        onCorePointerMissed,
    };
};
