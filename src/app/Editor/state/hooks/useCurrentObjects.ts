import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh, Object3D } from "three";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { removeSelected, setSelected } from "../editorReducer";
import useSceneObjects from "./useSceneObjects";

export default () => {
    const { scene } = useThree();
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector((x) => x.editor);
    // const { objects, getObjectById, removeObjectsArrayFromScene } = useSceneObjects();
    const [currentObjectsState, setCurrentObjectsState] = useState<Mesh[] | Object3D[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the currents elements ---> O(n) instead of O(n^2)
        const currentObjects = scene.children.filter((x) => {
            return selected.indexOf(x.name) !== -1;
        });

        setCurrentObjectsState(currentObjects);
    }, [selected]);

    return {
        currentObjects: currentObjectsState,
        setCurrentObjects: (uniqueName: string, isMultipleSelect = false) => {
            const newSelected = scene.children.find((x) => uniqueName === x.name);

            if (newSelected) {
                dispatch(setSelected({ newSelectedId: newSelected.name, isMultipleSelect }));
            }
        },
        removeCurrentObjects: () => {
            // removeObjectsArrayFromScene(currentObjectsState);
            // dispatch(removeSelected());
        },
    };
};
