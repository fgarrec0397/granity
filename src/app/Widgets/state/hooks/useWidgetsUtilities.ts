import { Object3D } from "three";
import useWidgets from "../../../Editor/state/hooks/useWidgets";
import constants from "../../../Core/constants";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export default () => {
    const { getWidgetById } = useWidgets();

    return {
        getWidgetByMesh: (mesh: Object3D) => {
            let widgetMesh: Object3D | undefined;

            mesh.traverseAncestors((object) => {
                if (object.name.startsWith(widgetObjectsPrefix)) {
                    widgetMesh = object;
                }
            });

            const widgetIdInMesh = widgetMesh?.name.split("+")[2];
            const widget = getWidgetById(widgetIdInMesh);

            return { widget, widgetMesh };
        },
    };
};
