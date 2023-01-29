import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

import useCoreService from "../_data/hooks/useCoreService";
import { EngineConfig } from "../coreTypes";

export default () => {
    const { onEditorPointerMissed, isEditor } = useEditor();
    const { onSave, updateOnSave } = useCoreService();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            if (isEditor) {
                onEditorPointerMissed(event);
            }
        },
        [isEditor, onEditorPointerMissed]
    );

    const initOnSave = useCallback(
        (onSaveCallback: EngineConfig["onSave"]) => {
            updateOnSave(onSaveCallback);
        },
        [updateOnSave]
    );

    return {
        onCorePointerMissed,
        onSave,
        initOnSave,
    };
};
