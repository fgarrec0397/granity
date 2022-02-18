import { AppState } from "./index";
import ElementService from "../Scene/_Editor/state/ElementsService";

export enum ServicesTypes {
    ElementsService = "ElementsService",
}

export interface IServicesFactory {
    state: AppState;
}

class ServicesFactory implements IServicesFactory {
    state: AppState;

    constructor(state: AppState) {
        this.state = state;
    }

    createService(type: ServicesTypes) {
        let service: ElementService;

        switch (type) {
            case ServicesTypes.ElementsService:
                service = new ElementService(this.state);

                return service;
            default:
                break;
        }
    }
}

export default ServicesFactory;
