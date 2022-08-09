import { useCallback } from "react";

import useEditorDispatch from "../_data/hooks/useEditorDispatch";
import useEditorSelector from "../_data/hooks/useEditorSelector";

export default () => {
    const { dispatchSetIsEditor } = useEditorDispatch();
    const { isEditor } = useEditorSelector();

    const setIsEditor = useCallback(() => dispatchSetIsEditor(), [dispatchSetIsEditor]);

    return { isEditor, setIsEditor };
};
