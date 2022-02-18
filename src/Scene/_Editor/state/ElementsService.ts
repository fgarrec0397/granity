import uidGenerator from "../../../common/utils/uidGenerator";
import AppService from "../../../app/AppService";
import { SceneElement } from "./types";

class ElementService extends AppService {
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
