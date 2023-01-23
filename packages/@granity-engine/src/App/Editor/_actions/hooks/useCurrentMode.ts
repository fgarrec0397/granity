import { ModesAvailable } from "@granity-engine/App/Editor/_actions/editorTypes";

import useEditorDispatch from "../_data/hooks/useEditorDispatch";
import useEditorSelector from "../_data/hooks/useEditorSelector";

export default () => {
    const { dispatchSetCurrentMode } = useEditorDispatch();
    const { currentMode } = useEditorSelector();

    return {
        currentMode,
        setCurrentMode: (mode: ModesAvailable) => dispatchSetCurrentMode(mode),
    };
};
