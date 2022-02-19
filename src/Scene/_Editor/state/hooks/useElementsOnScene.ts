import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElement } from "../types";

export default () => {
    const dispatch = useAppDispatch();
    const { elementsOnScene } = useAppSelector((state) => state.editor);

    return {
        elementsOnScene,
        setElementsOnScene: (element: SceneElement) => {
            const elements = elementsOnScene.map((x) => {
                if (x.id === element.id) {
                    return element;
                }

                return x;
            });

            dispatch(setElementsOnScene(elements));
        },
    };
};
