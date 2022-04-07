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
            console.log(widgetIdInMesh, "widgetIdInMesh");

            const widget = getWidgetById(widgetIdInMesh);
            console.log(widget, "widget selected");
        },
    };
};
