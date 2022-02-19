// @ts-ignore
import * as THREE from "three";
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

    createNewElement(componentName: string, defaultProperties?: any): SceneElement {
        const possiblyElementsOnScene = this.state.editor.elementsOnScene || [];
        const numberOfElementsByType = possiblyElementsOnScene.filter(
            (x) => x.component === componentName
        ).length;
        const id = uidGenerator();
        const name = `${componentName}${
            numberOfElementsByType < 10 ? "0" : null
        }${numberOfElementsByType}`;

        const element = {
            id,
            meshuuid: "",
            meshId: "",
            name,
            component: componentName,
            isSelected: false,
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1),
        };

        return {
            ...element,
            ...defaultProperties,
        };
    }

    updateElementsWith(newElement: SceneElement): SceneElement[] {
        const elements = this.getElements();
        const element = this.prepareElement(newElement);

        return [...elements, element];
    }

    removeElement(element: SceneElement): SceneElement[] {
        const elements = this.getElements();
        const filteredElements = elements.filter((x) => x.id !== element.id);

        return filteredElements;
    }
}

export default ElementService;
