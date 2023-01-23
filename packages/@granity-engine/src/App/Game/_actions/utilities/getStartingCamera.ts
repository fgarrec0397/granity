import { SceneCamera } from "@granity-engine/App/Scenes/_actions/scenesTypes";

export default (cameras: SceneCamera[]) => {
    return cameras.find((x) => x.isDefault) || cameras[0];
};
