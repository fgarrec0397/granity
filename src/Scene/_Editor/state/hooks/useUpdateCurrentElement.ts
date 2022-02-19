import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElement } from "../types";

export default () => {
    const dispatch = useAppDispatch();
    const currentElement = useAppSelector((state) => {
        return state.editor.elementsOnScene.find((x) => x.isSelected);
    });
    const { elementsOnScene } = useAppSelector((state) => state.editor);

    return (updatedElement: SceneElement) => {
        const updatedElements = elementsOnScene.map((x) => {
            if (x.id === currentElement?.id) {
                return updatedElement;
            }

            return x;
        });

        dispatch(setElementsOnScene(updatedElements));
    };
};
