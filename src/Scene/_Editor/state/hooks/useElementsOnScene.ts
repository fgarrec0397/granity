import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElement } from "../types";
import { ServicesTypes } from "../../../../app/ServicesFactory";
import useServicesFactory from "../../../../app/useServicesFactory";

export default () => {
    const dispatch = useAppDispatch();
    const { elementsOnScene } = useAppSelector((state) => state.editor);
    const elementsService = useServicesFactory(ServicesTypes.ElementsService);

    return {
        elementsOnScene,
        setElementsOnScene: (newElement: SceneElement) => {
            const elements = elementsService?.updateElementsWith(newElement) || [];

            dispatch(setElementsOnScene(elements));
        },
    };
};
