import { useThree } from "@react-three/fiber";

import getWidgetName from "../utilities/getWidgetName";
import { WidgetDictionaryItem } from "../widgetsTypes";

export default () => {
    const { scene } = useThree();

    const getMeshByWidget = (widget: WidgetDictionaryItem) => {
        const meshName = getWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return getMeshByWidget;
};
