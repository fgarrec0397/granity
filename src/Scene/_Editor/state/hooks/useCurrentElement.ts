import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setCurrentElement } from "../editorReducer";
import { SceneElement } from "../types";

export default () => {
    const dispatch = useAppDispatch();
    const { currentElement } = useAppSelector((state) => state.editor);

    return {
        currentElement,
        setCurrentElement: (element: SceneElement) => dispatch(setCurrentElement(element)),
    };
};
