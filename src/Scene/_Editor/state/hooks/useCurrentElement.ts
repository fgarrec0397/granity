import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setElementsOnScene, setIsMultipleSelect } from "../editorReducer";

export default () => {
    const dispatch = useAppDispatch();
    const currentElement = useAppSelector((state) => {
        return state.editor.elementsOnScene.find((x) => x.isSelected);
    });
    const { elementsOnScene } = useAppSelector((state) => state.editor);

    const detectMultipleSelection = () => {
        const arrayOfSelect = [];
        elementsOnScene.forEach((x) => {
            if (x.isSelected) {
                arrayOfSelect.push(x);
            }
        });
        // Dispatch an event to the store redux
        if (arrayOfSelect.length > 1) {
            dispatch(setIsMultipleSelect(true));
        } else {
            dispatch(setIsMultipleSelect(false));
        }
        // console.log(arrayOfSelect.length, "items selected");
    };

    return {
        currentElement,
        setCurrentElement: (elementId: string, isMultipleSelect: boolean) => {
            detectMultipleSelection();
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
