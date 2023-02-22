import { useThree } from "@react-three/fiber";

import getWidgetName from "../utilities/getWidgetName";
import { WidgetObjectsDictionaryItem } from "../widgetsTypes";

export default () => {
    const { scene } = useThree();

    const getMeshByWidget = (widget: WidgetObjectsDictionaryItem) => {
        const meshName = getWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return getMeshByWidget;
};
