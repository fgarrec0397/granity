import { useAppDispatch, useAppSelector } from "@core/store";
import { setCurrentMode } from "../state/editorReducer";
import { ModesAvailable } from "@editor/editorTypes";

export default () => {
    const dispatch = useAppDispatch();
    const { currentMode } = useAppSelector((state) => state.editor);

    return {
        currentMode,
        setCurrentMode: (mode: ModesAvailable) => dispatch(setCurrentMode(mode)),
    };
};
