import { Object3D } from "three";
import useWidgets from "../../../../Editor/state/hooks/useWidgets";
import constants from "../../../constants";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export default () => {
    const { getWidgetById } = useWidgets();

    return {
        getWidgetByMesh: (mesh: Object3D) => {
            let widgetWrapperMesh: Object3D | undefined;

            mesh.traverseAncestors((object) => {
                if (object.name.startsWith(widgetObjectsPrefix)) {
                    widgetWrapperMesh = object;
                }
            });

            const widgetIdInMesh = widgetWrapperMesh?.name.split("+")[2];
            const widget = getWidgetById(widgetIdInMesh);

            return widget; // TODO - can return widgetWrapperMesh here to make sure to have the mesh associated to this widget
        },
    };
};
