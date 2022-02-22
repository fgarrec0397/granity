import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setElementsOnScene } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const currentElements = useAppSelector((state) => {
        return state.editor.elementsOnScene.filter((x) => x.isSelected);
    });
    const currentElement = useAppSelector((state) => {
        return state.editor.elementsOnScene.find((x) => x.isSelected);
    });
    const { elementsOnScene } = useAppSelector((state) => state.editor);

    return {
        currentElements,
        currentElement,
        setCurrentElement: (elementId: string, isMultipleSelect = false) => {
            const updatedElements = elementsOnScene.map((x) => {
                if (x.meshuuid === elementId) {
                    return {
                        ...x,
                        isSelected: true,
                    };
                }

                if (isMultipleSelect) {
                    return x;
                }

                return {
                    ...x,
                    isSelected: false,
                };
            });

            dispatch(setElementsOnScene(updatedElements));
        },
        updateCurrentElement: (properties: any) => {
            const updatedElements = elementsOnScene.map((x) => {
                if (x.isSelected) {
                    return {
                        ...x,
                        ...properties,
                    };
                }

                return x;
            });

            dispatch(setElementsOnScene(updatedElements));
        },
    };
};
