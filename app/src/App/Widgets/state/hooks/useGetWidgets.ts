import { useThree } from "@react-three/fiber";
import { Object3D } from "three";
import constants from "../../../Core/constants";
import { WidgetModule, WidgetSceneObject } from "../../types";
import { getWidgetName } from "../../utilities";
import useSceneWidgetsContext from "./core/useSceneWidgetsContext";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export default () => {
    const { scene } = useThree();
    const { widgets } = useSceneWidgetsContext();

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets.find((x) => x.id === id);
        }
    };

    const getWidgetByMesh = (mesh: Object3D) => {
        let widgetMesh: Object3D | undefined;

        if (mesh.name.startsWith(widgetObjectsPrefix)) {
            widgetMesh = mesh;
        } else {
            mesh.traverseAncestors((object) => {
                if (object.name.startsWith(widgetObjectsPrefix)) {
                    widgetMesh = object;
                }
            });
        }

        const widgetIdInMesh = widgetMesh?.name.split("+")[2];
        const widget = getWidgetById(widgetIdInMesh) as WidgetSceneObject;

        return { widget, widgetMesh };
    };

    const getMeshByWidget = (widget: WidgetModule | WidgetSceneObject) => {
        const meshName = getWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return {
        getWidgetById,
        getWidgetByMesh,
        getMeshByWidget,
    };
};
