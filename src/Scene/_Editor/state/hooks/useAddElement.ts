import { useDispatch } from "react-redux";
import { ServicesTypes } from "../../../../app/ServicesFactory";
import useServicesFactory from "../../../../app/useServicesFactory";
import { addElementOnScene } from "../editorReducer";

export default () => {
    const dispatch = useDispatch();
    const elementsService = useServicesFactory(ServicesTypes.ElementsService);

    return (componentName: string, defaultProperties?: any) => {
        const element = elementsService.createNewElement(componentName, defaultProperties);

        dispatch(addElementOnScene(element));
    };
};
