import { useEffect, useState } from "react";
import { Object3D } from "three";
import useCurrentObjects from "../../Editor/state/hooks/useCurrentObjects";
import useHandleEditor from "../../Editor/state/hooks/useHandleEditor";
import useSceneObjects from "../../Editor/state/hooks/useSceneObjects";

export default () => {
    const { objects, copyObject } = useSceneObjects();
    const { currentObjects, removeCurrentObjects } = useCurrentObjects();
    const [copiedObjects, setCopiedObjects] = useState<Object3D[]>([]);

    useHandleEditor(); // TODO -- see why it doesnt workd

    useEffect(() => {
        console.log(objects, "objects");
    }, [objects.length]);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentObjects.length, currentObjects[0]?.id, copiedObjects, objects]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        if (event.ctrlKey && event.code === "KeyC") {
            if (currentObjects.length > 0) {
                setCopiedObjects(currentObjects);
            }
        } else if (event.ctrlKey && event.code === "KeyV") {
            if (copiedObjects.length > 0) {
                copiedObjects.forEach((x) => {
                    copyObject(x);
                });
            }
        } else if (event.code === "Delete") {
            if (currentObjects.length > 0) {
                removeCurrentObjects();
            }
        }
    };
};
