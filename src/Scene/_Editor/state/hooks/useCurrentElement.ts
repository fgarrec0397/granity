import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setCurrentElement } from "../editorReducer";
import { SceneElementInformations } from "../types";

export default () => {
    const dispatch = useAppDispatch();
    const { currentElement } = useAppSelector((state) => state.editor);

    return {
        currentElement,
        setCurrentElement: (element: SceneElementInformations) =>
            dispatch(setCurrentElement(element)),
    };
};
