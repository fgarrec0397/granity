import { useThree } from "@granity/three/fiber";

import { GameWidgetDictionaryItem } from "../gameTypes";
import getGameWidgetName from "../utilities/getGameWidgetName";

export default () => {
    const { scene } = useThree();

    const getMeshByGameWidget = (widget: GameWidgetDictionaryItem) => {
        const meshName = getGameWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return getMeshByGameWidget;
};
