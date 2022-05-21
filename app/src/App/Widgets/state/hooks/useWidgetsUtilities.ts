import { Object3D } from "three";
import { useThree } from "@react-three/fiber";
import useWidgets from "./useWidgets";
import constants from "../../../Core/constants";
import { IWidget, WidgetSceneObject } from "../../types";

const {
    widget: { widgetObjectsPrefix },
} = constants;

export default () => {
    const { scene } = useThree();
    const { getWidgetById } = useWidgets();

    const getWidgetName = (widget: IWidget | WidgetSceneObject) => {
        return `${widgetObjectsPrefix}+${widget.widgetDefinition.name}+${widget.id}`;
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

    const getMeshByWidget = (widget: IWidget | WidgetSceneObject) => {
        const meshName = getWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return {
        getWidgetName,
        getWidgetByMesh,
        getMeshByWidget,
    };
};
