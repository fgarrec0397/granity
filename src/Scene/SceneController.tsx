import React, { FC, useEffect, useState } from "react";
import Cube from "./_Editor/components/EditorElements/Geometry/Cube";
import Plane from "./_Editor/components/EditorElements/Geometry/Plane";
import { GeometryProps } from "./_Editor/components/EditorElements/types";
import Scene from "./Scene";
import useElementsOnScene from "./_Editor/state/hooks/useElementsOnScene";
import { SceneElement } from "./_Editor/state/types";
import useCurrentElement from "./_Editor/state/hooks/useCurrentElement";

interface ComponentsElements {
    [key: string]: FC<GeometryProps>;
}

const Components: ComponentsElements = {
    cube: Cube,
    plane: Plane,
};

const InstantiateElement = (element: SceneElement): React.ReactNode => {
    if (typeof Components[element.component] !== "undefined") {
        return React.createElement(Components[element.component], {
            key: element.id,
            sceneElement: element,
        });
    }

    return null;
};

const SceneController: FC = () => {
    const { elementsOnScene, setElementsOnScene } = useElementsOnScene();
    const { currentElement } = useCurrentElement();
    const [copiedElement, setCopiedElement] = useState<SceneElement>();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentElement, copiedElement, elementsOnScene]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.code === "KeyC") {
            if (currentElement) {
                setCopiedElement(currentElement);
            }
        } else if (event.ctrlKey && event.code === "KeyV") {
            if (copiedElement !== undefined) {
                setElementsOnScene(copiedElement);
            }
        }
    };

    return (
        <Scene>
            {elementsOnScene?.map((element: SceneElement) => InstantiateElement(element))}
        </Scene>
    );
};

export default SceneController;
