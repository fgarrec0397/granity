import { useThree } from "@granity/three/fiber";

import { GameWidgetDictionaryItem } from "../gameTypes";
import buildGameWidgetName from "../utilities/buildGameWidgetName";

export default () => {
    const { scene } = useThree();

    const getMeshByGameWidget = (widget: GameWidgetDictionaryItem) => {
        const meshName = buildGameWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return getMeshByGameWidget;
};
