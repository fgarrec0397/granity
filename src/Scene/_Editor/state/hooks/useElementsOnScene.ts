import uidGenerator from "../../../../common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElement } from "../types";

export default () => {
    const dispatch = useAppDispatch();
    const { elementsOnScene } = useAppSelector((state) => state.editor);

    return {
        elementsOnScene,
        setElementsOnScene: (newElement: SceneElement) => {
            // TODO - Be able to pass default position
            const possiblyElementsOnScene = elementsOnScene || [];
            const numberOfElementsByType = possiblyElementsOnScene.filter(
                (x) => x.component === newElement.component
            ).length;
            const id = uidGenerator();
            const name = `${newElement.component}${
                numberOfElementsByType < 10 ? "0" : null
            }${numberOfElementsByType}`;

            dispatch(
                setElementsOnScene([
                    ...elementsOnScene,
                    {
                        ...newElement,
                        id,
                        name,
                    },
                ])
            );
        },
    };
};
