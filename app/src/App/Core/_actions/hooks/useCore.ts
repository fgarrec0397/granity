import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { useCallback } from "react";

export default () => {
    const { onEditorPointerMissed } = useEditor();

    const onCorePointerMissed = useCallback(
        (event: MouseEvent) => {
            // TODO do the same for Game
            onEditorPointerMissed(event);
        },
        [onEditorPointerMissed]
    );

    return {
        onCorePointerMissed,
    };
};
