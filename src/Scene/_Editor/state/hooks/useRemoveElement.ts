import { useAppDispatch } from "../../../../app/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElement } from "../types";
import { ServicesTypes } from "../../../../app/ServicesFactory";
import useServicesFactory from "../../../../app/useServicesFactory";

export default () => {
    const dispatch = useAppDispatch();
    const elementsService = useServicesFactory(ServicesTypes.ElementsService);

    return (element: SceneElement) => {
        const elements = elementsService?.removeElement(element) || [];

        dispatch(setElementsOnScene(elements));
    };
};
