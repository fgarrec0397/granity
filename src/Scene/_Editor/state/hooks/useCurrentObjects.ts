import { useEffect, useState } from "react";
import { Object3D } from "three";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { removeSelected, setSelected } from "../editorReducer";
import useSceneObjects from "./useSceneObjects";

export default () => {
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((x) => x.editor);
    const { objects, getObjectById, removeObjectsArrayFromScene } = useSceneObjects();
    const [currentObjectsState, setCurrentObjectsState] = useState<Object3D[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the currents elements ---> O(n) instead of O(n^2)
        const currentObjects = objects.filter((x) => {
            return selected.indexOf(x.uuid) !== -1;
        });

        setCurrentObjectsState(currentObjects);
    }, [selected]);

    return {
        currentObjects: currentObjectsState,
        setCurrentObjects: (uuid: string, isMultipleSelect = false) => {
            const newSelected = getObjectById(uuid);

            if (newSelected) {
                dispatch(setSelected({ newSelectedId: newSelected.uuid, isMultipleSelect }));
            }
        },
        removeCurrentObjects: () => {
            removeObjectsArrayFromScene(currentObjectsState);
            dispatch(removeSelected());
        },
    };
};
