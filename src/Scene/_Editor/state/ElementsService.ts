import uidGenerator from "../../../common/utils/uidGenerator";
import { AppState } from "../../../store";
import { SceneElement } from "./types";

class ElementService {
    state: AppState;

    constructor(state: AppState) {
        this.state = state;
    }

    getElements(): SceneElement[] {
        return this.state.editor.elementsOnScene || [];
    }

    prepareElement(newElement: SceneElement): SceneElement {
        const possiblyElementsOnScene = this.state.editor.elementsOnScene || [];
        const numberOfElementsByType = possiblyElementsOnScene.filter(
            (x) => x.component === newElement.component
        ).length;
        const id = uidGenerator();
        const name = `${newElement.component}${
            numberOfElementsByType < 10 ? "0" : null
        }${numberOfElementsByType}`;

        return {
            ...newElement,
            id,
            name,
        };
    }

    updateElementsWith(newElement: SceneElement): SceneElement[] {
        const elements = this.getElements();
        const element = this.prepareElement(newElement);

        return [...elements, element];
    }
}

export default ElementService;
