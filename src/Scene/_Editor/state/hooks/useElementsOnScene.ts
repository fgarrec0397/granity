import { useAppDispatch, useAppSelector, useAppState } from "../../../../store/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElement } from "../types";
import ElementsService from "../ElementsService";

export default () => {
    const dispatch = useAppDispatch();
    const appState = useAppState();
    const { elementsOnScene } = useAppSelector((state) => state.editor);

    return {
        elementsOnScene,
        setElementsOnScene: (newElement: SceneElement) => {
            const elementsService = new ElementsService(appState);
            const elements = elementsService.updateElementsWith(newElement);

            dispatch(setElementsOnScene(elements));
        },
    };
};
