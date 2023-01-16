import { useHelper } from "@react-three/drei";
import { MutableRefObject } from "react";
import { Object3D } from "three";

import useEditor from "./useEditor";

type Constructor = new (...args: any[]) => any;
type Helper = Object3D & {
    update: () => void;
};

/**
 * It's `useHelper` hook from **react-three-drei** but it also manages the `isEditor` state.
 *
 * @param object3D The object you want to apply the helper on.
 * @param helperConstructor The helper you want to use.
 * @param additionnalCondition An additionnal condition you want to apply to display the helper.
 */

export default <T extends Constructor>(
    object3D: MutableRefObject<Object3D | null>,
    helperConstructor?: T,
    additionnalCondition = true
): MutableRefObject<Helper | undefined> => {
    const { isEditor } = useEditor();

    return useHelper(isEditor && additionnalCondition && object3D, helperConstructor as any); // TODO -- fix any type here
};
