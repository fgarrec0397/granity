import { ScenesDictionary } from "../scenesTypes";

export default (scenes: ScenesDictionary) => {
    return Object.keys(scenes).find((x) => scenes[x].isDefault) || Object.keys(scenes)[0];
};
