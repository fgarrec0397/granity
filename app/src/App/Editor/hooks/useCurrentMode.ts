import { useAppDispatch, useAppSelector } from "../../Core/store";
import { setCurrentMode } from "../state/editorReducer";
import { ModesAvailable } from "../editorTypes";

export default () => {
    const dispatch = useAppDispatch();
    const { currentMode } = useAppSelector((state) => state.editor);

    return {
        currentMode,
        setCurrentMode: (mode: ModesAvailable) => dispatch(setCurrentMode(mode)),
    };
};
