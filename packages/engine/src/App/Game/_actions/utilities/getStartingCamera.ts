import { SceneCamera } from "@engine/App/Scenes/_actions/scenesTypes";

export default (cameras: SceneCamera[]) => {
    return cameras.find((x) => x.isDefault) || cameras[0];
};
