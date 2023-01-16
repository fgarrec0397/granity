import { ScenesDictionary } from "../scenesTypes";

export default (scenes: ScenesDictionary) => {
    const firstNonDefaultSceneId =
        Object.keys(scenes).find((x) => !scenes[x].isDefault) || Object.keys(scenes)[0];

    return scenes[firstNonDefaultSceneId];
};
